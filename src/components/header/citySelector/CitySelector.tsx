import { useState, useEffect } from "react"
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useGetBootstrapQuery, useLazyGetCitiesQuery } from "../../../app/api/systemApi"

export default function CitySelector() {
  const { data: bootstrap } = useGetBootstrapQuery()
  const [city, setCity] = useState<string>("Москва")
  const [modalOpen, setModalOpen] = useState(false)
  const [triggerCities, { data: cities }] = useLazyGetCitiesQuery()

  useEffect(() => {
    if (bootstrap?.geolocation) setCity(bootstrap.geolocation)
  }, [bootstrap])

  const openModal = () => {
    triggerCities()
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handleSelectCity = (selected: string) => {
    setCity(selected)
    closeModal()
  }

  return (
    <>
      <div
        className="flex items-center cursor-pointer select-none group"
        onClick={openModal}
      >
        <MapPinIcon className="w-8 h-8 text-gray-600 mr-2 transition-colors group-hover:text-teal-600" />
        <div className="w-20 h-8 flex items-center overflow-hidden">
          <span className="text-gray-600 group-hover:text-teal-600 transition-colors text-sm truncate">
            {city}
          </span>
        </div>
      </div>

      {modalOpen && cities && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20"
            onClick={closeModal}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg w-80 max-h-[70vh] overflow-y-auto relative p-4">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-semibold mb-3">Выберите город</h2>
              <div className="flex flex-col gap-1">
                {cities.map((city: string) => (
                  <button
                    key={city}
                    className="text-left px-3 py-1 rounded hover:bg-teal-100"
                    onClick={() => handleSelectCity(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
