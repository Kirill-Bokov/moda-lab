// src/components/favoritePage/FavoriteToCartButton.tsx
import { ShoppingBagIcon } from "@heroicons/react/24/solid"
import { useAddCartItemMutation } from "../../app/api/cartApi"
import type { FavoriteItemDto } from "../../app/api/favoriteApi"
import { useState } from "react"

type Props = {
  item: FavoriteItemDto
}

export function FavoriteToCartButton({ item }: Props) {
  const [addCartItem, { isLoading }] = useAddCartItemMutation()
  const [error, setError] = useState(false)

  const handleAddToCart = async () => {
    if (item.sizeId == null) {
      setError(true)
      return
    }

    try {
      await addCartItem({
        variantId: item.variantId,
        sizeId: item.sizeId,
        quantity: 1
      }).unwrap()
      setError(false)
    } catch {
      setError(true)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`flex items-center justify-center gap-2 py-2 px-3 font-medium rounded transition text-white
          ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}
          ${error ? "border-2 border-red-500" : ""}`}
      >
        <ShoppingBagIcon className="w-5 h-5" />
        Добавить в корзину
      </button>
      {error && <span className="text-red-500 text-sm">Невозможно добавить в корзину</span>}
    </div>
  )
}
