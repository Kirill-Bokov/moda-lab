import { HeartIcon, ShoppingCartIcon, UserIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function HeaderRight() {
  return (
    <div className="w-full flex justify-around">
      {/* Блок с иконкой местоположения */}
      <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
        <MapPinIcon className="w-8 h-8 text-gray-600" />
      </div>

      {/* Блок с тремя иконками: сердечко, корзина, профиль */}
      <div className="flex justify-end items-center gap-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
          <HeartIcon className="w-8 h-8 text-gray-600" />
        </div>

        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
          <ShoppingCartIcon className="w-8 h-8 text-gray-600" />
        </div>

        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
          <UserIcon className="w-8 h-8 text-gray-600" />
        </div>
      </div>
    </div>

  )
}
