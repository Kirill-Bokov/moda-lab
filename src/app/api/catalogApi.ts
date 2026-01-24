import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, Product, AttributeApi } from "../../types/catalogTypes"
import type { ProductCard } from "../../types/productTypes"
import type { GenderString } from "../../types/catalogTypes"

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://95.81.114.17:3000/api",
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
      Product[],
      { categoryId: number; filters?: string }
    >({
      query: ({ categoryId, filters }) => ({
        url: `/products/category/${categoryId}`,
        params: filters ? { filter: filters } : undefined,
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        console.log("getProductsByCategory args", args)
        try {
          const { data } = await queryFulfilled
          console.log("getProductsByCategory response", data)
        } catch (e) {
          console.error("getProductsByCategory error", e)
        }
      },
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

  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryAttributesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} = catalogApi
