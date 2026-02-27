import { baseApi } from "./baseApi"
import type { SearchResponse } from "../../types/searchTypes"

export const searchApi = baseApi.injectEndpoints({
    endpoints: builder => ({

        searchProducts: builder.query<SearchResponse, string>({
            query: q => ({
                url: "/search",
                params: { q },
            }),
        }),

    }),
})

export const { useSearchProductsQuery } = searchApi
