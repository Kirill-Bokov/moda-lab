import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
}

const initialState: AuthState = {
  accessToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken
    },
    logout: state => {
      state.accessToken = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
