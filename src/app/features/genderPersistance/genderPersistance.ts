import type { Middleware } from "@reduxjs/toolkit"
import { setGender } from "../../slices/genderSlice"

export const genderPersistenceMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action)

    if (setGender.match(action)) {
      const gender = store.getState().gender.value
      localStorage.setItem("gender", gender)
    }

    return result
  }
