import { createSlice } from "@reduxjs/toolkit"

interface FavoriteAnimationState {
  trigger: boolean
}

const initialState: FavoriteAnimationState = {
  trigger: false
}

export const favoriteAnimationSlice = createSlice({
  name: "favoriteAnimation",
  initialState,
  reducers: {
    triggerAnimation: state => {
      state.trigger = true
    },
    resetAnimation: state => {
      state.trigger = false
    }
  }
})

export const { triggerAnimation, resetAnimation } = favoriteAnimationSlice.actions
export default favoriteAnimationSlice.reducer