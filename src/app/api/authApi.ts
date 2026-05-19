import { baseApi } from "./baseApi"
import { setCredentials, logout } from "../slices/authSlice"

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({

    login: builder.mutation<
      { accessToken: string },
      { email: string; password: string }
    >({
      query: credentials => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ accessToken: data.accessToken }))
        } catch {}
      },
    }),

    register: builder.mutation<
      { accessToken: string },
      { email: string; password: string; name: string }
    >({
      query: userData => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ accessToken: data.accessToken }))
        } catch {}
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

  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi
