import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import type { RootState } from "../../app/store"
import { setSort } from "../../app/slices/sortSlice"
import type { SortOrder } from "../../app/slices/sortSlice"

const options = [
  { label: "По умолчанию", sortBy: null, order: null },
  { label: "По возрастанию цены", sortBy: "price", order: "asc" as SortOrder },
  { label: "По убыванию цены", sortBy: "price", order: "desc" as SortOrder },
]

export function SortSelector() {
  const dispatch = useDispatch()
  const sortState = useSelector((state: RootState) => state.sort)
  const [, setSearchParams] = useSearchParams()

  const handleChange = (option: typeof options[number]) => {
    dispatch(setSort({ sortBy: option.sortBy, order: option.order }))

    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.set("page", "1")
      return next
    })
  }

  return (
    <div className="flex gap-2">
      {options.map(option => (
        <button
          key={option.label}
          className={`px-3 py-1 rounded border ${
            sortState.sortBy === option.sortBy && sortState.order === option.order
              ? "bg-gray-300"
              : "bg-white"
          }`}
          onClick={() => handleChange(option)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
