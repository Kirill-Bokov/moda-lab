import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../app/store"
import { setSingleFilter } from "../../app/slices/filtersSlice"
import { GENDER_ATTRIBUTE_ID, GENDER_VALUES } from "../../app/constants"
import type { GenderKey } from "../../app/constants"

export default function GenderToggle() {
  const dispatch = useDispatch()

  const selectedGender = useSelector((state: RootState) => {
    const value = state.filters.draft[GENDER_ATTRIBUTE_ID]?.[0]
    if (value === GENDER_VALUES.male) return "male"
    if (value === GENDER_VALUES.female) return "female"
    return "unisex"
  })

  const handleChange = (value: string) => {
    if (!value) return

    dispatch(
      setSingleFilter({
        attributeId: GENDER_ATTRIBUTE_ID,
        valueId: GENDER_VALUES[value as GenderKey],
      })
    )
  }

  return (
    <ToggleGroup.Root
      type="single"
      value={selectedGender}
      onValueChange={handleChange}
      className="inline-flex rounded-md border border-gray-200 overflow-hidden"
    >
      <ToggleGroup.Item
        value="female"
        className={selectedGender === "female"
          ? "bg-blue-500 text-white"
          : "text-gray-700 hover:bg-gray-100"
        }
      >
        Женщинам
      </ToggleGroup.Item>

      <ToggleGroup.Item
        value="male"
        className={selectedGender === "male"
          ? "bg-blue-500 text-white"
          : "text-gray-700 hover:bg-gray-100"
        }
      >
        Мужчинам
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
