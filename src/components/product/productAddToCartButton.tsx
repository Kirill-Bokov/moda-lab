import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/solid"
import { useAddCartItemMutation } from "../../app/api/cartApi"
import { useAddFavoriteItemMutation, useRemoveFavoriteItemMutation, useGetFavoriteQuery } from "../../app/api/favoriteApi"
import { useState, useEffect } from "react"

type Props = {
  variantId: number
  selectedSizeId: number | null
}

export function ProductAddToCartButton({ variantId, selectedSizeId }: Props) {
  const [addCartItem, { isLoading: cartLoading }] = useAddCartItemMutation()
  const [addFavoriteItem] = useAddFavoriteItemMutation()
  const [removeFavoriteItem] = useRemoveFavoriteItemMutation()
  const { data: favorites = [] } = useGetFavoriteQuery()
  const [sizeError, setSizeError] = useState(false)

  const favoriteEntry = favorites.find(
    item => item.variantId === variantId
  )
  const isFavorite = !!favoriteEntry

  const handleAddToCart = async () => {
    if (!selectedSizeId) {
      setSizeError(true)
      return
    }
    await addCartItem({
      variantId,
      sizeId: selectedSizeId,
      quantity: 1
    })
    setSizeError(false)
  }

  const handleToggleFavorite = async () => {
    if (isFavorite && favoriteEntry) {
      await removeFavoriteItem(favoriteEntry.id)
    } else {
      await addFavoriteItem({
        variantId,
        sizeId: selectedSizeId ?? null
      })
    }
  }

  const isDisabled = !selectedSizeId || cartLoading

  useEffect(() => {
    if (selectedSizeId) setSizeError(false)
  }, [selectedSizeId])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <button
          onClick={handleAddToCart}
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-medium rounded transition text-white
            ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}
            ${sizeError ? "border-2 border-red-500" : ""}`}
        >
          <ShoppingBagIcon className="w-5 h-5" />
          Добавить в корзину
        </button>

        <button
          onClick={handleToggleFavorite}
          className={`w-12 h-12 flex items-center justify-center rounded border transition ${
            isFavorite
              ? "bg-red-400 text-white border-red-400"
              : "bg-white text-gray-500 border-gray-300 hover:text-red-400 hover:border-red-400"
          }`}
        >
          <HeartIcon className="w-6 h-6" />
        </button>
      </div>

      {sizeError && (
        <span className="text-red-500 text-sm">
          Выберите размер
        </span>
      )}
    </div>
  )
}
