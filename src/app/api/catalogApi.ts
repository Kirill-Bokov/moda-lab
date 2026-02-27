import { baseApi } from "./baseApi"
import type {
    Category,
    ProductsByCategoryResponse,
    AttributeApi,
    GenderString,
    FilterItem,
} from "../../types/catalogTypes"

export const catalogApi = baseApi.injectEndpoints({
    endpoints: builder => ({

        getCategories: builder.query<Category[], { gender: GenderString }>({
            query: ({ gender }) => `categories?gender=${gender}`,
        }),

        getCategoryAttributes: builder.query<AttributeApi[], number>({
            query: categoryId => `categories/attributes/${categoryId}`,
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
    }),
})

export const {
    useGetCategoriesQuery,
    useGetCategoryAttributesQuery,
    useGetProductsByCategoryQuery,
} = catalogApi
