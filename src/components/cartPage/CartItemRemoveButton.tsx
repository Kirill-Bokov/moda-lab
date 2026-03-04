import { TrashIcon } from "@heroicons/react/24/solid"
import { useRemoveCartItemMutation } from "../../app/api/cartApi"

type Props = {
  itemId: number
}

export function CartItemRemoveButton({ itemId }: Props) {
  const [removeCartItem, { isLoading }] = useRemoveCartItemMutation()

  return (
    <button
      onClick={() => removeCartItem(itemId)}
      disabled={isLoading}
      className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
      aria-label="Удалить товар"
    >
      <TrashIcon className="w-5 h-5 text-red-400" />
    </button>
  )
}
