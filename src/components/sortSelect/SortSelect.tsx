import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../app/store"
import { setSort } from "../../app/slices/sortSlice"
import type { SortOrder } from "../../app/slices/sortSlice"

const options = [
  { label: "По умолчанию", sort: null, order: null },
  { label: "По возрастанию цены", sort: "price", order: "asc" as SortOrder },
  { label: "По убыванию цены", sort: "price", order: "desc" as SortOrder },
]

export function SortSelector() {
  const dispatch = useDispatch()
  const sortState = useSelector((state: RootState) => state.sort)

  const handleChange = (option: typeof options[number]) => {
    dispatch(setSort({ sort: option.sort, order: option.order }))
  }

  return (
    <div className="flex gap-2">
      {options.map(option => (
        <button
          key={option.label}
          className={`px-3 py-1 rounded border ${
            sortState.sort === option.sort && sortState.order === option.order
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
