import { configureStore } from "@reduxjs/toolkit"
import genderReducer, { type Gender } from "./slices/genderSlice"
import { catalogApi } from "./api/catalogApi"
import { genderPersistenceMiddleware } from "./features/genderPersistance/genderPersistance"

function loadGenderFromStorage(): Gender {
  const saved = localStorage.getItem("gender")
  if (saved === "male" || saved === "female" || saved === "unisex") {
    return saved
  }
  return "unisex"
}

export const store = configureStore({
  reducer: {
    gender: genderReducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
  },
  preloadedState: {
    gender: {
      value: loadGenderFromStorage(),
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(genderPersistenceMiddleware)
      .concat(catalogApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
