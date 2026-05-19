import { baseApi } from "./baseApi"
import type { ProductCard } from "../../types/productTypes"

export const productApi = baseApi.injectEndpoints({
  endpoints: builder => ({

    getProductById: builder.query<ProductCard, number>({
      query: variantId => `products/${variantId}`,
    }),

  }),
})

export const { useGetProductByIdQuery } = productApi
