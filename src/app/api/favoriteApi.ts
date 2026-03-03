import { baseApi } from "./baseApi"
import type { FavoriteItemDto } from "../../types/cartTypes"

export const favoriteApi = baseApi.injectEndpoints({
  endpoints: builder => ({

    getFavorites: builder.query<FavoriteItemDto[], void>({
      query: () => "favorites",
      providesTags: ["Favorite"]
    }),

    toggleFavorite: builder.mutation<void, { variantId: number }>({
      query: body => ({
        url: "favorites/toggle",
        method: "POST",
        body
      }),
      invalidatesTags: ["Favorite"]
    })

  })
})

export const {
  useGetFavoritesQuery,
  useToggleFavoriteMutation
} = favoriteApi
