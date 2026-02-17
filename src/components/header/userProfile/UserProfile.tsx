import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserIcon } from "@heroicons/react/24/outline"
import { useGetBootstrapQuery, useLogoutMutation } from "../../../app/api/catalogApi"

export default function UserProfile() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { data } = useGetBootstrapQuery()
  const [logout] = useLogoutMutation()

  const isAuthenticated = data?.isAuthenticated ?? true
  const userName = data?.user?.name ?? "Неизвестный"
  const userEmail = data?.user?.email ?? "noname@mail.com"

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate("/login")
    } else {
      setOpen(prev => !prev)
    }
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      setOpen(false)
      navigate("/login")
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return (
    <div
      className="relative flex items-center justify-center w-10 h-10 bg-gray-200 rounded cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => isAuthenticated && setOpen(true)}
      onMouseLeave={() => isAuthenticated && setOpen(false)}
    >
      <UserIcon className="w-8 h-8 text-gray-600" />

      {isAuthenticated && open && (
        <div className="absolute top-full mt-1 right-0 w-48 bg-white shadow-lg z-50 rounded py-2 flex flex-col">
          <div className="px-4 py-1 text-gray-800 font-medium truncate">{userName}</div>
          <div className="px-4 py-1 text-gray-600 truncate">{userEmail}</div>
          <button
            className="mt-2 mx-4 py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  )
}
