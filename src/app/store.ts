import { configureStore } from "@reduxjs/toolkit"
import filtersReducer from "./slices/filtersSlice"
import sortReducer from "./slices/sortSlice"
import authReducer from "./slices/authSlice"
import { baseApi } from "./api/baseApi"
import { filtersListener } from "./filtersListener"
import {
  loadFiltersFromStorage,
  loadGenderAsFilter,
} from "./features/filtersPersistance/filtersPersistance"
import { useDispatch } from "react-redux"

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  preloadedState: {
    filters:
      loadFiltersFromStorage() ??
      loadGenderAsFilter(),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(filtersListener.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()