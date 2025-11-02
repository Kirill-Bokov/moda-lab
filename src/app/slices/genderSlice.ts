import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface GenderState {
  value: "unisex" | "male" | "female"
}

const savedGender = localStorage.getItem("gender") as GenderState["value"] | null

const initialState: GenderState = {
  value: savedGender === "male" || savedGender === "female" || savedGender === "unisex"
    ? savedGender
    : "unisex",
}

export const genderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    setGender: (state, action: PayloadAction<GenderState["value"]>) => {
      state.value = action.payload
      localStorage.setItem("gender", action.payload)
    },
  },
})

export const { setGender } = genderSlice.actions
export default genderSlice.reducer
