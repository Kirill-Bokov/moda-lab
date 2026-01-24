import type { RootState } from "../store"
import { GENDER_ATTRIBUTE_ID, GENDER_VALUES } from "../constants"

export function selectGender(state: RootState): "male" | "female" | "unisex" {
  const rawValue =
    state.filters.draft[GENDER_ATTRIBUTE_ID]?.[0] ??
    GENDER_VALUES.unisex

  console.log("selectGender raw value", rawValue)

  if (rawValue === GENDER_VALUES.male) {
    console.log("selectGender resolved", "male")
    return "male"
  }

  if (rawValue === GENDER_VALUES.female) {
    console.log("selectGender resolved", "female")
    return "female"
  }

  console.log("selectGender resolved", "unisex")
  return "unisex"
}
