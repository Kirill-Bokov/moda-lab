import { baseApi } from "./baseApi"
import type { CartItemDto, AddCartItemDto } from "../../types/cartTypes"

export type FavoriteItemDto = CartItemDto
export type AddFavoriteItemDto = Omit<AddCartItemDto, "quantity"> & {
  sizeId?: number | null
  quantity?: number
}

export const favoriteApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFavorite: builder.query<FavoriteItemDto[], void>({
      query: () => "favorite"
    }),

    addFavoriteItem: builder.mutation<FavoriteItemDto, AddFavoriteItemDto>({
      query: body => ({
        url: "favorite",
        method: "POST",
        body
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          favoriteApi.util.updateQueryData("getFavorite", undefined, draft => {
            const exists = draft.find(
              item =>
                item.variantId === arg.variantId &&
                (item.sizeId ?? undefined) === (arg.sizeId ?? undefined)
            )
            if (!exists) {
              draft.push({
                id: -Date.now(), // временный id
                variantId: arg.variantId,
                sizeId: arg.sizeId ?? null,
                quantity: arg.quantity ?? 1
              })
            }
          })
        )

        try {
          const { data } = await queryFulfilled
          dispatch(
            favoriteApi.util.updateQueryData("getFavorite", undefined, draft => {
              const index = draft.findIndex(
                item =>
                  item.variantId === data.variantId &&
                  (item.sizeId ?? undefined) === (data.sizeId ?? undefined)
              )
              if (index !== -1) {
                draft[index] = data
              } else {
                draft.push(data)
              }
            })
          )
        } catch {
          patchResult.undo()
        }
      }
    }),

    removeFavoriteItem: builder.mutation<void, number>({
      query: id => ({
        url: `favorite/${id}`,
        method: "DELETE"
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          favoriteApi.util.updateQueryData("getFavorite", undefined, draft => {
            return draft.filter(item => item.id !== id)
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    })
  })
})

export const {
  useGetFavoriteQuery,
  useAddFavoriteItemMutation,
  useRemoveFavoriteItemMutation
} = favoriteApi
