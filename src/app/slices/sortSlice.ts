import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
export type SortOrder = "asc" | "desc" | null

interface SortState {
  sortBy: string | null
  order: SortOrder
}

const initialState: SortState = {
  sortBy: null,
  order: null,
}

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort(_, action: PayloadAction<{ sortBy: string | null; order: SortOrder }>) {
      return {...action.payload}
    },
    resetSort(state) {
      state.sortBy = null
      state.order = null
    },
  },
})

export const { setSort, resetSort } = sortSlice.actions
export default sortSlice.reducer
