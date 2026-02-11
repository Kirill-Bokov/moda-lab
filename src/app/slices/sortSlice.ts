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
    setSort(_, action: PayloadAction<{ sort: string | null; order: SortOrder }>) {
      return {...action.payload}
    },
    resetSort(state) {
      state.sort = null
      state.order = null
    },
  },
})

export const { setSort, resetSort } = sortSlice.actions
export default sortSlice.reducer
