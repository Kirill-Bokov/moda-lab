import type { RootState } from "../store"
import { cartApi } from "../api/cartApi"
import { productApi } from "../api/productApi"
import type { ProductVariant } from "../../types/productTypes"

export const selectCartView = (state: RootState) => {
  const cartResult = cartApi.endpoints.getCart.select()(state)
  const cartItems = cartResult.data ?? []

  return cartItems.map(item => {
    const productQuery =
      productApi.endpoints.getProductById.select(item.variantId)(state)

    const product = productQuery.data
    if (!product) return null

    const variant: ProductVariant | undefined =
      product.variants.find(v => v.id === item.variantId)

    if (!variant) return null

    const size = variant.sizes.find(s => s.id === item.sizeId)

    return {
      id: item.id,
      variantId: variant.id,
      sku: variant.sku,
      price: variant.price,
      images: variant.images,
      size,
      quantity: item.quantity
    }
  }).filter(Boolean)
}
