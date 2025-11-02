import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, Product, Attribute } from "../../types/catalogTypes";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://95.81.114.17:3000/api" }),

  endpoints: (builder) => ({
    getCategories: builder.query<Category[], { gender: string }>({
      query: ({ gender }) => {
        const params = new URLSearchParams();
        params.append("gender", gender);
        return `categories?${params.toString()}`;
      },
      transformResponse: (response: Category[]) => {
        console.log("getCategories response:", response);
        return response;
      },
    }),

    getProductsByCategory: builder.query<
      Product[],
      {
        categoryId: number;
        page?: number;
        limit?: number;
        filter?: Attribute[];
        gender: string;
      }
    >({
      query: ({ categoryId, page = 1, limit = 30, filter, gender }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (filter && filter.length > 0) {
          params.append("filter", JSON.stringify(filter));
        }
        params.append("gender", gender);
        return `products/category/${categoryId}?${params.toString()}`;
      },
      transformResponse: (response: Product[]) => {
        console.log("getProductsByCategory response:", response);
        return response;
      },
    }),

    getProductById: builder.query<Product, number>({
      query: (productId) => `products/${productId}`,
      transformResponse: (response: Product) => {
        console.log("getProductById response:", response);
        return response;
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} = catalogApi;
