import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

type Props = {
  variantId: number
}

export function ProductAddToCartButton({ variantId }: Props) {
  const [favorite, setFavorite] = useState(false)

  const handleAddToCart = () => {
    console.log("Добавить в корзину, variantId:", variantId)
  }

  const handleToggleFavorite = () => {
    setFavorite(prev => !prev)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleAddToCart}
        className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white py-3 font-medium rounded hover:bg-teal-700 transition"
      >
        <ShoppingBagIcon className="w-5 h-5" />
        Добавить в корзину
      </button>

      <button
        onClick={handleToggleFavorite}
        className={`w-12 h-12 flex items-center justify-center rounded border transition ${
          favorite ? "bg-red-400 text-white border-red-400" : "bg-white text-gray-500 border-gray-300 hover:text-red-400 hover:border-red-400"
        }`}
        title={favorite ? "В избранном" : "Добавить в избранное"}
      >
        <HeartIcon className="w-6 h-6" />
      </button>
    </div>
  )
}
