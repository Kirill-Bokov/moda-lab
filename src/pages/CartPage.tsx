import { useGetCartQuery } from "../app/api/cartApi"
import { CartItem } from "../components/cartPage/CartItem"

export default function CartPage() {
  const { data: cart, isLoading, isError } = useGetCartQuery()

  if (isLoading) return <p>Загрузка корзины...</p>
  if (isError) return <p>Ошибка при загрузке корзины</p>
  if (!cart || cart.length == 0) return <p>Корзина пуста</p>

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-4">
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  )
}