import { useDispatch } from "react-redux"
import { applyFilters } from "../../app/slices/filtersSlice"

export function ApplyFiltersButton() {
  const dispatch = useDispatch()

  return (
    <button
      onClick={() => dispatch(applyFilters())}
      className="fixed bottom-6 right-6 bg-teal-600 text-white px-6 py-3 rounded shadow-lg hover:bg-teal-700"
    >
      Применить фильтры
    </button>
  )
}
