import { useNavigate } from "react-router-dom"
import type { CartItemDto } from "../../types/cartTypes"
import { CartItemQuantity } from "./CartItemQuantity"
import { CartItemRemoveButton } from "./CartItemRemoveButton"
import { useGetProductByIdQuery } from "../../app/api/productApi"
import type { ProductVariant, ProductSize } from "../../types/productTypes"

type Props = {
  item: CartItemDto
}

export function CartItem({ item }: Props) {
  const navigate = useNavigate()
  const { data: product } = useGetProductByIdQuery(item.variantId)

  if (!product) return null

  const variant: ProductVariant | undefined = product.variants.find(
    v => v.id === item.variantId
  )

  if (!variant) return null

  const size: ProductSize | undefined = variant.sizes.find(
    s => s.id === item.sizeId
  )

  const imageUrl = variant.images[0]?.url ?? ""

  return (
    <div className="flex items-center gap-4 border p-4 rounded">
      <img
        src={imageUrl}
        alt={product.name}
        onClick={() => navigate(`/product/${item.variantId}`)}
        className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80"
      />

      <div className="flex-1 flex flex-col gap-1">
        <h3 className="font-medium">{product.name}</h3>
        <p>Размер: {size?.size ?? "не выбран"}</p>
        <p>Цена: {variant.price} ₽</p>
        <CartItemQuantity item={item} />
      </div>

      <CartItemRemoveButton itemId={item.id} />
    </div>
  )
}
