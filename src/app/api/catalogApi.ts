import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, Product, Attribute } from "../../types/catalogTypes"
import type { Gender } from "../slices/genderSlice"
import type { ProductCard } from "../../types/productTypes"
const GENDER_ATTRIBUTE_ID = 6

const genderToValueIdMap: Record<Gender, number> = {
  male: 24,
  female: 25,
  unisex: 26,
}

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://95.81.114.17:3000/api",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], { gender: Gender }>({
      query: ({ gender }) => `categories?gender=${gender}`,
    }),

    getCategoryAttributes: builder.query<Attribute[], number>({
      query: (categoryId) => `categories/attributes/${categoryId}`,
    }),

    getProductsByCategory: builder.query<
      Product[],
      {
        categoryId: number
        filter?: Attribute[]
        gender: Gender
      }
    >({
      query: ({ categoryId, filter = [], gender }) => {
        const params = new URLSearchParams()

        const genderFilter = {
          attributeId: GENDER_ATTRIBUTE_ID,
          valueId: genderToValueIdMap[gender],
        }

        const finalFilter = [genderFilter, ...filter]

        params.append("filter", JSON.stringify(finalFilter))

        return `products/category/${categoryId}?${params.toString()}`
      },
    }),


    getProductById: builder.query<ProductCard, number>({
      query: (productId) => `products/${productId}`,
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryAttributesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} = catalogApi
