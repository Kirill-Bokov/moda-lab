import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { toggleFilter } from "../../app/slices/filtersSlice"
import type { RootState } from "../../app/store"
import type { AttributeApi } from "../../types/catalogTypes"

type Props = AttributeApi

export function AttributeItem({
  attributeId,
  attributeName,
  values,
}: Props) {
  const dispatch = useDispatch()
  const draft = useSelector((state: RootState) => state.filters.draft)
  const [open, setOpen] = useState(false)
  const isSelected = (valueId: number) =>
    draft[attributeId]?.includes(valueId) ?? false
  console.log("AttributeItem values", values)

  return (
    <div className="mb-2 w-48">
      <button onClick={() => setOpen(p => !p)}>
        {attributeName}
      </button>

      {open && (
        <div>
          {values.map(v => (
            <button
              key={`${attributeId}-${v.id}`}
              onClick={() => dispatch(toggleFilter({
                attributeId,
                valueId: v.id,
              }))}
              className={isSelected(v.id) ? "bg-teal-600 text-white" : ""}
            >
              {v.value}
            </button>
          ))}


        </div>
      )}
    </div>
  )
}
