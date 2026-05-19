import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  const goToCatalog = () => {
    navigate("/catalog")
  }

  return (
    <div className="flex flex-col gap-8">

      <section
        onClick={goToCatalog}
        className="relative w-full h-[500px] cursor-pointer group"
      >
        <img
          src="https://s3-eu-central-1.amazonaws.com/enka-panel/images/promotion_web_image/Sy42JuxcWx-main.jpeg"
          alt="Hero"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-4">
            Новая коллекция
          </h1>
          <p className="text-lg mb-6">
            Весна / Лето 2026
          </p>
          <button className="px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-200 transition">
            Смотреть каталог
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">

        <div
          onClick={goToCatalog}
          className="relative h-[300px] cursor-pointer group"
        >
          <img
            src="https://s3-eu-central-1.amazonaws.com/enka-panel/images/promotion_web_image/SyKou9nuWl-main.jpeg"
            alt="Category"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold">
            Одежда
          </div>
        </div>

        <div
          onClick={goToCatalog}
          className="relative h-[300px] cursor-pointer group"
        >
          <img
            src="https://s3-eu-central-1.amazonaws.com/enka-panel/images/promotion_web_image/SyKou9nuWl-main.jpeg"
            alt="Category"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold">
            Обувь
          </div>
        </div>

        <div
          onClick={goToCatalog}
          className="relative h-[300px] cursor-pointer group"
        >
          <img
            src="https://s3-eu-central-1.amazonaws.com/enka-panel/images/promotion_web_image/SyKou9nuWl-main.jpeg"
            alt="Category"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold">
            Аксессуары
          </div>
        </div>

      </section>

      <section
        onClick={goToCatalog}
        className="relative h-[350px] mx-4 cursor-pointer group"
      >
        <img
          src="https://s3-eu-central-1.amazonaws.com/enka-panel/images/promotion_web_image/Sy42JuxcWx-main.jpeg"
          alt="Banner"
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition rounded" />

        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
          Скидки до 50%
        </div>
      </section>

    </div>
  )
}
