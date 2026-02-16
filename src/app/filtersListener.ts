import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { toggleFilter, setSingleFilter, applyFilters } from "./slices/filtersSlice"

export const filtersListener = createListenerMiddleware()

filtersListener.startListening({
  matcher: isAnyOf(toggleFilter, setSingleFilter),
  effect: async (_, api) => {
    api.cancelActiveListeners()
    await api.delay(500)
    api.dispatch(applyFilters())
  },
})
