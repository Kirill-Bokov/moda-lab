import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import type { RootState } from "../../../app/store"
import { setSingleFilter } from "../../../app/slices/filtersSlice"
import { GENDER_ATTRIBUTE_ID, GENDER_VALUES } from "../../../app/constants"
import type { GenderKey } from "../../../app/constants"

export default function GenderToggle() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const selectedGender = useSelector((state: RootState) => {
    const value = state.filters.draft[GENDER_ATTRIBUTE_ID]?.[0]
    if (value === GENDER_VALUES.male) return "male"
    if (value === GENDER_VALUES.female) return "female"
    return "unisex"
  })

  const handleChange = (value: string) => {
    if (!value) return
    if (location.pathname === "/") {
      dispatch(
        setSingleFilter({
          attributeId: GENDER_ATTRIBUTE_ID,
          valueId: GENDER_VALUES[value as GenderKey],
        })
      )
      navigate("/catalog")
      return
    }

    if (selectedGender === value) {
      navigate("/catalog")
      return
    }

    dispatch(
      setSingleFilter({
        attributeId: GENDER_ATTRIBUTE_ID,
        valueId: GENDER_VALUES[value as GenderKey],
      })
    )
  }

const genderButton = (value: string) =>
  `cursor-pointer flex-1 text-center pb-1 mx-2 transition-colors relative
   text-sm md:text-base
   ${selectedGender === value
     ? "border-b-2 border-teal-500 text-teal-600"
     : "text-gray-700 hover:text-teal-500"}`

  return (
    <div className="flex justify-center mt-1">
      <div className={genderButton("female")} onClick={() => handleChange("female")}>
        Женщинам
      </div>
      <div className={genderButton("male")} onClick={() => handleChange("male")}>
        Мужчинам
      </div>
    </div>
  )
}
