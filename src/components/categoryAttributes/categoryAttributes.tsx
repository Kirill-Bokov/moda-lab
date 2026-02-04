import { useSelector } from "react-redux"
import { useState } from "react"
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import type { RootState } from "../../app/store"
import type { AttributeApi } from "../../types/catalogTypes"
import { AttributeItem } from "../attributeItem/AttributeItem"
import { ApplyFiltersButton } from "../applyFiltersButton/ApplyFiltersButton"

type Props = {
  attributes?: AttributeApi[]
}

const BASE_ATTRIBUTE_NAMES = [
  "Основной материал",
  "Цвет",
  "Размер",
  "Цена",
  "Тип",
  "Посадка",
]

export function CategoryAttributes({ attributes }: Props) {
  const draft = useSelector((state: RootState) => state.filters.draft)
  const applied = useSelector((state: RootState) => state.filters.applied)
  const [expanded, setExpanded] = useState(false)

  const hasDraft = Object.keys(draft).length > 0
  const hasChanges =
    JSON.stringify(draft) !== JSON.stringify(applied)

  const filteredAttributes = attributes?.filter(
    attr => attr.attributeName !== "Пол"
  )

  const baseAttributes = filteredAttributes?.filter(attr =>
    BASE_ATTRIBUTE_NAMES.includes(attr.attributeName)
  )

  const extraAttributes = filteredAttributes?.filter(
    attr => !BASE_ATTRIBUTE_NAMES.includes(attr.attributeName)
  )

  return (
    <>
      <div className="bg-gray-200 p-4 rounded mb-6 flex flex-wrap gap-4">
        {baseAttributes?.map(attr => (
          <AttributeItem
            key={attr.attributeId}
            attributeId={attr.attributeId}
            attributeName={attr.attributeName}
            values={attr.values}
          />
        ))}

        <button
          type="button"
          onClick={() => setExpanded(p => !p)}
          className="ml-auto flex items-center gap-1 rounded-lg px-2 py-1 transition-colors hover:bg-gray-300"
        >
          <AdjustmentsHorizontalIcon className="h-4 w-4" />
          Все фильтры
        </button>

        {expanded && (
          <div className="w-full flex flex-wrap gap-4 mt-2">
            {extraAttributes?.map(attr => (
              <AttributeItem
                key={attr.attributeId}
                attributeId={attr.attributeId}
                attributeName={attr.attributeName}
                values={attr.values}
              />
            ))}
          </div>
        )}
      </div>

      {hasDraft && hasChanges && <ApplyFiltersButton />}
    </>
  )
}
