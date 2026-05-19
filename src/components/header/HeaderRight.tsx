import UserProfile from "./userProfile/UserProfile"
import CitySelector from "./citySelector/CitySelector"
import { FavoriteButton } from "./favoriteButton/FavoriteButton"
import { CartButton } from "./cartButton/CartButton"

export default function HeaderRight() {
  return (
    <div className="w-full flex justify-around">
      <CitySelector />
      <div className="flex justify-end items-center gap-6">
        <FavoriteButton />
        <CartButton />
        <UserProfile />
      </div>
    </div>
  )
}
