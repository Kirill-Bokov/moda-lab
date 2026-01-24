import type { RootState } from "../store"

export const selectAppliedFiltersQuery = (state: RootState) => {
  const applied = state.filters.applied

  console.log("selectAppliedFiltersQuery input", applied)

  const appliedArray = Object.entries(applied)
    .map(([attributeId, valueIds]) =>
      valueIds.map(valueId => ({
        attributeId: Number(attributeId),
        valueId,
      }))
    )
    .flat()

  const result = JSON.stringify(appliedArray)

  console.log("selectAppliedFiltersQuery output", result)

  return result
}
