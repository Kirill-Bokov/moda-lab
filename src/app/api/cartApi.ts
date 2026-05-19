import { baseApi } from "./baseApi"
import type {
  CartItemDto,
  AddCartItemDto,
  UpdateCartItemDto
} from "../../types/cartTypes"

export const cartApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCart: builder.query<CartItemDto[], void>({
      query: () => "cart"
    }),

    addCartItem: builder.mutation<CartItemDto, AddCartItemDto>({
      query: body => ({
        url: "cart",
        method: "POST",
        body
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, draft => {
            const existing = draft.find(
              item =>
                item.variantId === arg.variantId &&
                item.sizeId === arg.sizeId
            )

            if (existing) {
              existing.quantity += arg.quantity
            } else {
              draft.push({
                id: -Date.now(), 
                ...arg
              })
            }
          })
        )

        try {
          const { data } = await queryFulfilled
          dispatch(
            cartApi.util.updateQueryData("getCart", undefined, draft => {
              const index = draft.findIndex(
                item =>
                  item.variantId === data.variantId &&
                  item.sizeId === data.sizeId
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

    updateCartItem: builder.mutation<CartItemDto, UpdateCartItemDto>({
      query: ({ id, ...body }) => ({
        url: `cart/${id}`,
        method: "PATCH",
        body
      }),

      async onQueryStarted({ id, quantity }, { dispatch, queryFulfilled }) {

        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, draft => {
            const item = draft.find(i => i.id === id)
            if (item) {
              item.quantity = quantity
            }
          })
        )

        try {
          const { data } = await queryFulfilled
          dispatch(
            cartApi.util.updateQueryData("getCart", undefined, draft => {
              const index = draft.findIndex(i => i.id === id)
              if (index !== -1) {
                draft[index] = data
              }
            })
          )

        } catch {
          patchResult.undo()
        }
      }
    }),

    removeCartItem: builder.mutation<void, number>({
      query: id => ({
        url: `cart/${id}`,
        method: "DELETE"
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {

        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, draft => {
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
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation
} = cartApi
