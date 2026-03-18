import { useGetFavoriteQuery } from "../app/api/favoriteApi"
import { FavoriteItem } from "../components/favoritePage/FavoriteItem"


export default function FavoritePage() {
  const { data: cart, isLoading, isError } = useGetFavoriteQuery()

  if (isLoading) return <p>Загрузка избранного...</p>
  if (isError) return <p>Ошибка при загрузке избранного</p>
  if (!cart || cart.length === 0) return <p>Избранное пусто</p>
  
  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-4">
      {cart.map(item => (
        <FavoriteItem key={item.id} item={item} />
      ))}
    </div>
  )
}