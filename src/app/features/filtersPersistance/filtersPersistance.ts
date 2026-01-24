import {
  GENDER_ATTRIBUTE_ID,
  GENDER_VALUES,
  type GenderKey,
} from "../../constants"

export function loadFiltersFromStorage() {
  const saved = localStorage.getItem("filters")
  if (!saved) return undefined

  try {
    return JSON.parse(saved)
  } catch {
    return undefined
  }
}

export function loadGenderAsFilter() {
  const saved = localStorage.getItem("gender")

  const value =
    saved && saved in GENDER_VALUES
      ? GENDER_VALUES[saved as GenderKey]
      : GENDER_VALUES.unisex

  return {
    draft: {
      [GENDER_ATTRIBUTE_ID]: [value],
    },
    applied: {
      [GENDER_ATTRIBUTE_ID]: [value],
    },
  }
}
