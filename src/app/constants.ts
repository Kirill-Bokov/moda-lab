export const GENDER_ATTRIBUTE_ID = 6

export const GENDER_VALUES = {
  male: 24,
  female: 25,
  unisex: 26,
} as const

export type GenderKey = keyof typeof GENDER_VALUES
