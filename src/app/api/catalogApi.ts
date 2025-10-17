import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  Category,
  Product,
  ProductWithAttributes,
  Attribute,
} from "../../types/catalogTypes"

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),

  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "categories",
      transformResponse: (response: Category[]) => {
        console.log("📦 getCategories response:", response)
        return response
      },
    }),

    getProductsByCategory: builder.query<
      Product[],
      { categoryId: number; page?: number; limit?: number; filter?: Attribute[] }
    >({
      query: ({ categoryId, page = 1, limit = 30, filter }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        })
        if (filter && filter.length > 0) {
          params.append("filter", JSON.stringify(filter))
        }
        return `products/category/${categoryId}?${params.toString()}`
      },
      transformResponse: (response: Product[]) => {
        console.log("📦 getProductsByCategory response:", response)
        return response
      },
    }),

    getProductById: builder.query<ProductWithAttributes, number>({
      query: (productId) => `products/${productId}`,
      transformResponse: (response: ProductWithAttributes) => {
        console.log("📦 getProductById response:", response)
        return response
      },
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} = catalogApi
