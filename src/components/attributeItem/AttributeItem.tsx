import { useDispatch, useSelector } from "react-redux"
import { useState, useRef, useLayoutEffect } from "react"
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
  const draft = useSelector((state: RootState) => state.filters.draft)
  const [open, setOpen] = useState(false)
  const [dropdownWidth, setDropdownWidth] = useState(0)

  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const headerRef = useRef<HTMLDivElement>(null)

  const isSelected = (valueId: number) =>
    draft[attributeId]?.includes(valueId) ?? false

  const hasSelected = draft[attributeId]?.length > 0

  useLayoutEffect(() => {
    if (!open) return
    const headerWidth = headerRef.current?.offsetWidth || 0
    let maxItemWidth = 0
    itemRefs.current.forEach(el => {
      if (el) maxItemWidth = Math.max(maxItemWidth, el.offsetWidth)
    })
    setDropdownWidth(Math.max(headerWidth, maxItemWidth))
  }, [open, values])

  return (
    <div
      className="relative inline-block min-w-[35px]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        ref={headerRef}
        className={`flex items-center justify-between rounded-lg px-2 py-1 cursor-pointer transition-colors w-max
          ${hasSelected ? "bg-teal-600 text-white" : "hover:bg-gray-100 text-black"}`}
      >
        <span>{attributeName}</span>
        <ChevronDownIcon
          className={`h-4 w-4 ml-2 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      {open && (
        <div
          className="absolute left-0 top-full z-10 pt-1"
          style={{ minWidth: dropdownWidth }}
        >
          <div className="rounded-lg bg-white shadow-md overflow-hidden">
            {values.map((v, index) => {
              const selected = isSelected(v.id)
              return (
                <button
                  key={`${attributeId}-${v.id}`}
                  ref={el => { itemRefs.current[index] = el }}
                  type="button"
                  onClick={() =>
                    dispatch(
                      toggleFilter({
                        attributeId,
                        valueId: v.id,
                      })
                    )
                  }
                  className={[
                    "block w-full text-left px-2 py-1 transition-colors whitespace-nowrap",
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
