import { TrashIcon } from "@heroicons/react/24/solid"
import { useRemoveFavoriteItemMutation } from "../../app/api/favoriteApi"

type Props = {
  itemId: number
}

export function FavoriteItemRemoveButton({ itemId }: Props) {
  const [removeFavoriteItem, { isLoading }] = useRemoveFavoriteItemMutation()

  return (
    <button
      onClick={() => removeFavoriteItem(itemId)}
      disabled={isLoading}
      className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
      aria-label="Удалить товар"
    >
      <TrashIcon className="w-5 h-5 text-red-400" />
    </button>
  )
}
