import { useUpdateCartItemMutation } from "../../app/api/cartApi"
import { useRemoveCartItemMutation } from "../../app/api/cartApi"
import type { CartItemDto } from "../../types/cartTypes"

type Props = {
  item: CartItemDto
}

export function CartItemQuantity({ item }: Props) {
  const [updateCartItem, { isLoading }] = useUpdateCartItemMutation()
  const [removeCartItem] = useRemoveCartItemMutation()

  const handleChange = async (delta: number) => {
    const newQuantity = item.quantity + delta
    if (newQuantity < 1) {
      await removeCartItem(item.id)
    return
    }
    await updateCartItem({ id: item.id, quantity: newQuantity })
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleChange(-1)}
        disabled={isLoading}
        className="px-2 py-1 border rounded"
      >
        -
      </button>
      <span>{item.quantity}</span>
      <button
        onClick={() => handleChange(1)}
        disabled={isLoading}
        className="px-2 py-1 border rounded"
      >
        +
      </button>
    </div>
  )
}