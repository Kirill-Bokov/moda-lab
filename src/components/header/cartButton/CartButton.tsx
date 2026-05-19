import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { useAnimationState } from "../../../app/features/animationContext/animationContext"
import { useGetCartQuery } from "../../../app/api/cartApi"

export function CartButton() {
  const navigate = useNavigate()
  const { animateCart } = useAnimationState()

  const { data: cart = [] } = useGetCartQuery()

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleClick = () => {
    navigate("/cart")
  }

  return (
    <div
      onClick={handleClick}
      className={`relative flex items-center justify-center w-10 h-10 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition ${
        animateCart ? "cart-shake" : ""
      }`}
    >
      <ShoppingCartIcon className="w-8 h-8 text-gray-600" />

      {totalCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs px-1.5 py-0.5 rounded-full">
          {totalCount}
        </span>
      )}
    </div>
  )
}
