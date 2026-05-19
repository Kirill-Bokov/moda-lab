import { HeartIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { useAnimationState } from "../../../app/features/animationContext/animationContext"

export function FavoriteButton() {
  const navigate = useNavigate()
  const { animateFavorite } = useAnimationState()

  const handleClick = () => navigate("/favorites")

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center w-10 h-10 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition ${
        animateFavorite ? "heartbeat" : ""
      }`}
    >
      <HeartIcon className="w-8 h-8 text-gray-600" />
    </div>
  )
}
