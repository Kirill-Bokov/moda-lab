import {
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline"
import UserProfile from "./userProfile/UserProfile"
import CitySelector from "./citySelector/CitySelector"

export default function HeaderRight() {
  return (
    <div className="w-full flex justify-around">
      <CitySelector />
      <div className="flex justify-end items-center gap-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
          <HeartIcon className="w-8 h-8 text-gray-600" />
        </div>

        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
          <ShoppingCartIcon className="w-8 h-8 text-gray-600" />
        </div>

        <UserProfile />
      </div>
    </div>
  )
}
