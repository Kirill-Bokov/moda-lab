import { configureStore } from "@reduxjs/toolkit"
import { catalogApi } from "./api/catalogApi"
import genderReducer from "./slices/genderSlice"

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    gender: genderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
