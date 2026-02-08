import type { RootState } from "../store"
import type { FilterItem } from "../../types/catalogTypes"

export const selectAppliedFiltersQuery = (state: RootState): FilterItem[] | undefined => {
  const applied = state.filters.applied

  if (!applied) return undefined

  const appliedArray = Object.entries(applied)
    .map(([attributeId, valueIds]) =>
      valueIds.map(valueId => ({
        attributeId: Number(attributeId),
        valueId,
      }))
    )
    .flat()

  return appliedArray.length > 0 ? appliedArray : undefined
}
