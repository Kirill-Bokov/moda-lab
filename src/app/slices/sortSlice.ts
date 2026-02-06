import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
export type SortOrder = "asc" | "desc" | null

interface SortState {
  sort: string | null
  order: SortOrder
}

const initialState: SortState = {
  sort: null,
  order: null,
}

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<{ sort: string | null; order: SortOrder }>) {
      state.sort = action.payload.sort
      state.order = action.payload.order
    },
    resetSort(state) {
      state.sort = null
      state.order = null
    },
  },
})

export const { setSort, resetSort } = sortSlice.actions
export default sortSlice.reducer
