import { HeartIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../../app/store"
import { resetAnimation } from "../../../app/slices/favoriteAnimationSlice"
import { useEffect, useState } from "react"

export function FavoriteButton() {
  const navigate = useNavigate()
  const trigger = useSelector((state: RootState) => state.favoriteAnimation.trigger)
  const dispatch = useDispatch()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (trigger) {
      setAnimate(true)
      const timeout = setTimeout(() => {
        setAnimate(false)
        dispatch(resetAnimation())
      }, 600)
      return () => clearTimeout(timeout)
    }
  }, [trigger, dispatch])

  const handleClick = () => navigate("/favorites")

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center w-10 h-10 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition ${
        animate ? "heartbeat" : ""
      }`}
    >
      <HeartIcon className="w-8 h-8 text-gray-600" />
    </div>
  )
}
