import { baseApi } from "./baseApi"
import type {
    CartItemDto,
    AddCartItemDto,
    UpdateCartItemDto
} from "../../types/cartTypes"

export const cartApi = baseApi.injectEndpoints({
    endpoints: builder => ({

        getCart: builder.query<CartItemDto[], void>({
            query: () => "cart",
            providesTags: ["Cart"]
        }),

        addCartItem: builder.mutation<CartItemDto, AddCartItemDto>({
            query: body => ({
                url: "cart",
                method: "POST",
                body
            }),
            invalidatesTags: ["Cart"]
        }),

        updateCartItem: builder.mutation<CartItemDto, UpdateCartItemDto>({
            query: ({ id, ...body }) => ({
                url: `cart/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["Cart"]
        }),

        removeCartItem: builder.mutation<void, number>({
            query: id => ({
                url: `cart/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Cart"]
        })

    }),
})

export const {
    useGetCartQuery,
    useAddCartItemMutation,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation
} = cartApi
