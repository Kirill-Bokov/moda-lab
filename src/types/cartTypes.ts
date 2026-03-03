export interface CartItemDto {
  id: number
  variantId: number
  sizeId: number
  quantity: number
}

export interface AddCartItemDto {
  variantId: number
  sizeId: number
  quantity: number
}

export interface UpdateCartItemDto {
  id: number
  quantity: number
}

export interface FavoriteItemDto {
  id: number
  variantId: number
}
