import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface FiltersState {
  draft: Record<number, number[]>
  applied: Record<number, number[]>
}

const initialState: FiltersState = {
  draft: {},
  applied: {},
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleFilter(
      state,
      action: PayloadAction<{ attributeId: number; valueId: number }>
    ) {
      const { attributeId, valueId } = action.payload
      const current = state.draft[attributeId] ?? []

      if (current.includes(valueId)) {
        const next = current.filter(v => v !== valueId)
        if (next.length === 0) {
          delete state.draft[attributeId]
        } else {
          state.draft[attributeId] = next
        }
      } else {
        state.draft[attributeId] = [...current, valueId]
      }
    },

    applyFilters(state) {
      state.applied = Object.fromEntries(
        Object.entries(state.draft).map(([k, v]) => [Number(k), [...v]])
      )
    },

    resetFilters(state) {
      state.draft = {}
      state.applied = {}
    },
    setSingleFilter(
      state,
      action: PayloadAction<{ attributeId: number; valueId: number }>
    ) {
      const { attributeId, valueId } = action.payload
      state.draft[attributeId] = [valueId]
      state.applied[attributeId] = [valueId]
    },
  },

})

export const { toggleFilter, applyFilters, resetFilters, setSingleFilter } =
  filtersSlice.actions

export default filtersSlice.reducer
