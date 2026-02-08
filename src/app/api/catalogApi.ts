import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, ProductsByCategoryResponse, AttributeApi } from "../../types/catalogTypes"
import type { ProductCard } from "../../types/productTypes"
import type { GenderString, FilterItem } from "../../types/catalogTypes"
import type { SearchResponse } from "../../types/searchTypes"

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: builder => ({

    getCategories: builder.query<Category[], { gender: GenderString }>({
      query: ({ gender }) => `categories?gender=${gender}`,
      onQueryStarted: async (args, { queryFulfilled }) => {
        console.log("getCategories args", args)
        try {
          const { data } = await queryFulfilled
          console.log("getCategories response", data)
        } catch (e) {
          console.error("getCategories error", e)
        }
      },
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
        sort?: string
        order?: "asc" | "desc"
      }
    >({
      query: ({ categoryId, page, limit, filters, sort, order }) => ({
        url: `/products/category/${categoryId}`,
        params: {
          page,
          limit,
          filter: filters ? JSON.stringify(filters) : undefined,
          sort,
          order,
        },
      }),
    }),



    getProductById: builder.query<ProductCard, number>({
      query: variantId => `products/${variantId}`,
      onQueryStarted: async (variantId, { queryFulfilled }) => {
        console.log("getProductById variantId", variantId)
        try {
          const { data } = await queryFulfilled
          console.log("getProductById response", data)
        } catch (e) {
          console.error("getProductById error", e)
        }
      },
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
