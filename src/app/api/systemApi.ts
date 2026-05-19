import { baseApi } from "./baseApi"
import type { BootstrapResponse } from "../../types/initTypes"
import { setCredentials } from "../slices/authSlice"

export const systemApi = baseApi.injectEndpoints({
  endpoints: builder => ({

    getBootstrap: builder.query<BootstrapResponse, void>({
      query: () => "/bootstrap",
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.accessToken) {
            dispatch(setCredentials({ accessToken: data.accessToken }))
          }
        } catch {}
      },
    }),

    getCities: builder.query<string[], void>({
      query: () => "/cities",
    }),

  }),
})

export const {
  useGetBootstrapQuery,
  useGetCitiesQuery,
  useLazyGetCitiesQuery,
} = systemApi
