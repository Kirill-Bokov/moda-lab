import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import type { RootState } from "../../app/store"
import { setGender } from "../../app/slices/genderSlice"

export default function GenderToggle() {
  const dispatch = useDispatch()
  const gender = useSelector((state: RootState) => state.gender.value)

  useEffect(() => {
    console.log("Текущее значение пола:", gender)
  }, [gender])

  const handleChange = (value: string) => {
    if (!value) return
    const selectedGender = value === "male" ? "male" : "female"
    dispatch(setGender(selectedGender))
    console.log("Выбран пол:", selectedGender)
  }

  return (
    <ToggleGroup.Root
      type="single"
      value={gender}
      onValueChange={handleChange}
      className="inline-flex rounded-md border border-gray-200 overflow-hidden"
    >
      <ToggleGroup.Item
        value="female"
        className={`hidden md:flex px-3 py-1 text-sm font-medium transition-colors hover:cursor-pointer
          ${
            gender === "female"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
      >
        Женщинам
      </ToggleGroup.Item>

      <ToggleGroup.Item
        value="male"
        className={`hidden md:flex px-3 py-1 text-sm font-medium transition-colors hover:cursor-pointer
          ${
            gender === "male"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
      >
        Мужчинам
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
