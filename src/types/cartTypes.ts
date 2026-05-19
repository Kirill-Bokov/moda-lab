export interface CartItemDto {
  id: number
  variantId: number
  sizeId: number | null
  quantity?: number
}

export interface AddCartItemDto {
  variantId: number
  sizeId: number | null
  quantity: number
}

export interface UpdateCartItemDto {
  id: number
  quantity: number
}
