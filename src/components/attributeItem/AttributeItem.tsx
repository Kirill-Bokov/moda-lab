import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
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
  const [, setSearchParams] = useSearchParams()

  const draft = useSelector((state: RootState) => state.filters.draft)
  const [open, setOpen] = useState(false)

  const isSelected = (valueId: number) =>
    draft[attributeId]?.includes(valueId) ?? false

  const hasSelected = draft[attributeId]?.length > 0

  const handleToggle = (valueId: number) => {
    dispatch(
      toggleFilter({
        attributeId,
        valueId,
      })
    )

    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.set("page", "1")
      return next
    })
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={[
          "flex items-center rounded-lg px-2 py-1 cursor-pointer transition-colors w-max",
          hasSelected
            ? "bg-teal-600 text-white"
            : "hover:bg-gray-100 text-black",
        ].join(" ")}
      >
        <span className="whitespace-nowrap">{attributeName}</span>

        <ChevronDownIcon
          className={[
            "h-4 w-4 ml-2 transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </div>

      {open && (
        <div className="absolute left-0 top-full pt-1 z-10">
          <div className="w-max min-w-[90px] whitespace-nowrap rounded-lg bg-white shadow-md overflow-hidden">
            {values.map(v => {
              const selected = isSelected(v.id)

              return (
                <button
                  key={`${attributeId}-${v.id}`}
                  type="button"
                  onClick={() => handleToggle(v.id)}
                  className={[
                    "block w-full text-left px-2 py-1 transition-colors",
                    selected
                      ? "bg-teal-600 text-white"
                      : "hover:bg-gray-200",
                  ].join(" ")}
                >
                  {v.value}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
