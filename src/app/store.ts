import { configureStore } from "@reduxjs/toolkit"
import type { Middleware } from "@reduxjs/toolkit"
import filtersReducer from "./slices/filtersSlice"
import { catalogApi } from "./api/catalogApi"
import {
  loadFiltersFromStorage,
  loadGenderAsFilter,
} from "./features/filtersPersistance/filtersPersistance"

function isActionWithType(action: unknown): action is { type: string; payload?: unknown } {
  return (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    typeof (action as any).type === "string"
  )
}

const debugMiddleware: Middleware = store => next => action => {
  if (!isActionWithType(action)) {
    return next(action)
  }

  const isApiAction = action.type.startsWith("catalogApi/")
  const isFiltersAction = action.type.startsWith("filters/")

  if (isApiAction || isFiltersAction) {
    console.log("ACTION", action.type)
    console.log("PAYLOAD", action.payload)
    console.log("STATE BEFORE", store.getState())
  }

  const result = next(action)

  if (isApiAction || isFiltersAction) {
    console.log("STATE AFTER", store.getState())
  }

  return result
}

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
  },
  preloadedState: {
    filters:
      loadFiltersFromStorage() ??
      loadGenderAsFilter(),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(debugMiddleware)
      .concat(catalogApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
