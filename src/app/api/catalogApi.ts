import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, ProductsByCategoryResponse, AttributeApi } from "../../types/catalogTypes"
import type { ProductCard } from "../../types/productTypes"
import type { GenderString, FilterItem } from "../../types/catalogTypes"
import type { SearchResponse } from "../../types/searchTypes"
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
      onQueryStarted: async (categoryId, { queryFulfilled }) => {
        console.log("getCategoryAttributes categoryId", categoryId)
        try {
          const { data } = await queryFulfilled
          console.log("getCategoryAttributes response", data)
        } catch (e) {
          console.error("getCategoryAttributes error", e)
        }
      },
    }),

    getProductsByCategory: builder.query<
      ProductsByCategoryResponse,
      {
        categoryId: number
        page: number
        limit: number
        filters?: FilterItem[]
        sortBy?: string
        order?: "asc" | "desc"
      }
    >({
      query: ({ categoryId, page, limit, filters, sortBy, order }) => ({
        url: `/products/category/${categoryId}`,
        params: {
          page,
          limit,
          filter: filters ? JSON.stringify(filters) : undefined,
          sortBy,
          order,
        },
      }),
    }),



    getProductById: builder.query<ProductCard, number>({
      query: variantId => `products/${variantId}`,
    }),

    searchProducts: builder.query<SearchResponse, string>({
      query: q => ({
        url: "/search",
        params: { q },
      }),
    }),

    getAttributes: builder.query<AttributeApi[], void>({
      query: () => "/products/attributes",
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryAttributesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useGetAttributesQuery
} = catalogApi
