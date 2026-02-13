import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, Product, AttributeApi } from "../../types/catalogTypes"
import type { ProductCard } from "../../types/productTypes"
import type { GenderString } from "../../types/catalogTypes"
import type { RootState } from "../../app/store"
import { setCredentials, logout } from "../slices/authSlice"

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) headers.set("Authorization", `Bearer ${token}`) 
    return headers
  },
  credentials: "include",
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions)
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
    getCategories: builder.query<Category[], { gender: GenderString }>({
      query: ({ gender }) => `categories?gender=${gender}`,
    }),
    getCategoryAttributes: builder.query<AttributeApi[], number>({
      query: categoryId => `categories/attributes/${categoryId}`,
    }),
    getProductsByCategory: builder.query<Product[], { categoryId: number; filters?: string }>({
      query: ({ categoryId, filters }) => ({
        url: `/products/category/${categoryId}`,
        params: filters ? { filter: filters } : undefined,
      }),
    }),
    getProductById: builder.query<ProductCard, number>({
      query: variantId => `products/${variantId}`,
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryAttributesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} = catalogApi
