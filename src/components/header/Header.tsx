import HeaderLeft from "./HeaderLeft"
import HeaderSearch from "./HeaderSearch"
import HeaderRight from "./HeaderRight"

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-none md:flex-row flex-col justify-around px-4 py-3 md:py-4 gap-4">
        <div className="order-1 flex-1 md:justify-start justify-center">
          <HeaderLeft />
        </div>

        <div className="order-3 md:order-2 flex-1 justify-center items-center">
          <HeaderSearch />
        </div>

        <div className="order-2 md:order-3 flex-1 flex justify-center md:justify-evenly">
          <HeaderRight />
        </div>
      </div>
    </header>
  )
}
