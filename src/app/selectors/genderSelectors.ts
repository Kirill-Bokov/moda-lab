import type { RootState } from "../store"
import { GENDER_ATTRIBUTE_ID, GENDER_VALUES } from "../constants"

export function selectGender(state: RootState): "male" | "female" | "unisex" {
  const rawValue =
    state.filters.draft[GENDER_ATTRIBUTE_ID]?.[0] ??
    GENDER_VALUES.unisex

  if (rawValue === GENDER_VALUES.male) {
    return "male"
  }

  if (rawValue === GENDER_VALUES.female) {
    return "female"
  }

  return "unisex"
}
