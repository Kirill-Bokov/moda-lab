import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export type Gender = "unisex" | "male" | "female"

interface GenderState {
  value: Gender
}

const initialState: GenderState = {
  value: "unisex",
}

export const genderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    setGender: (state, action: PayloadAction<Gender>) => {
      state.value = action.payload
    },
  },
})

export const { setGender } = genderSlice.actions
export default genderSlice.reducer
