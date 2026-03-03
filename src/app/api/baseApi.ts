import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../app/store"
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"
import { setCredentials, logout } from "../slices/authSlice"

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})

let refreshingPromise: Promise<
  Awaited<ReturnType<typeof rawBaseQuery>>
> | null = null

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    if (!refreshingPromise) {
      refreshingPromise = (async () => {
        try {
          return await rawBaseQuery(
            { url: "/auth/refresh", method: "POST" },
            api,
            extraOptions
          )
        } finally {
          refreshingPromise = null
        }
      })()
    }

    const refreshResult = await refreshingPromise

    if (
      refreshResult?.data &&
      typeof refreshResult.data === "object" &&
      "accessToken" in refreshResult.data
    ) {
      const { accessToken } = refreshResult.data as { accessToken: string }

      api.dispatch(setCredentials({ accessToken }))

      result = await rawBaseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Catalog", "Product", "Search", "Auth", "Bootstrap", "City", "Cart", "Favorite"],
  endpoints: () => ({}),
})
