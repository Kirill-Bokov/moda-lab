import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, ProductsByCategoryResponse, AttributeApi } from "../../types/catalogTypes"
import type { ProductCard } from "../../types/productTypes"
import type { GenderString, FilterItem } from "../../types/catalogTypes"
import type { SearchResponse } from "../../types/searchTypes"
import type { RootState } from "../../app/store"
import { setCredentials, logout } from "../slices/authSlice"
import type { BootstrapResponse } from "../../types/initTypes"

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) headers.set("Authorization", `Bearer ${token}`)
    return headers
  },
  credentials: "include",
})

let refreshingPromise: Promise<{ data?: any }> | null = null

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    if (!refreshingPromise) {
      refreshingPromise = baseQuery("/auth/refresh", api, extraOptions) as Promise<{ data?: any }>
    }

    const refreshResult = await refreshingPromise
    refreshingPromise = null

    if (
      refreshResult.data &&
      typeof refreshResult.data === "object" &&
      "accessToken" in refreshResult.data
    ) {
      const { accessToken } = refreshResult.data as { accessToken: string }
      api.dispatch(setCredentials({ accessToken }))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    refreshToken: builder.query<{ accessToken: string }, void>({
      query: () => "/auth/refresh",
    }),

    getCategories: builder.query<Category[], { gender: GenderString }>({
      query: ({ gender }) => `categories?gender=${gender}`,
    }),

    getCategoryAttributes: builder.query<AttributeApi[], number>({
      query: categoryId => `categories/attributes/${categoryId}`,
    }),

    getProductsByCategory: builder.query<
      ProductsByCategoryResponse,
      { categoryId: number; page: number; limit: number; filters?: FilterItem[]; sortBy?: string; order?: "asc" | "desc" }
    >({
      query: ({ categoryId, page, limit, filters, sortBy, order }) => ({
        url: `/products/category/${categoryId}`,
        params: { page, limit, filter: filters ? JSON.stringify(filters) : undefined, sortBy, order },
      }),
    }),

    getProductById: builder.query<ProductCard, number>({
      query: variantId => `products/${variantId}`,
    }),

    searchProducts: builder.query<SearchResponse, string>({
      query: q => ({ url: "/search", params: { q } }),
    }),

    login: builder.mutation<{ accessToken: string }, { email: string; password: string }>({
      query: credentials => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ accessToken: data.accessToken }))
        } catch { }
      },
    }),

    register: builder.mutation<{ accessToken: string }, { email: string; password: string; name: string }>({
      query: userData => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ accessToken: data.accessToken }))
        } catch { }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } finally {
          dispatch(logout())
        }
      },
    }),
    getBootstrap: builder.query<BootstrapResponse, void>({
      query: () => "/bootstrap",
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.accessToken) {
            dispatch(setCredentials({ accessToken: data.accessToken }))
          }
        } catch { }
      },
    }),

  }),
})

export const {
  useRefreshTokenQuery,
  useGetCategoriesQuery,
  useGetCategoryAttributesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyRefreshTokenQuery,
  useGetBootstrapQuery
} = catalogApi
