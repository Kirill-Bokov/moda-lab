import { useSelector } from "react-redux"
import type { RootState } from "../../app/store"
import type { AttributeApi } from "../../types/catalogTypes"
import { AttributeItem } from "../attributeItem/AttributeItem"
import { ApplyFiltersButton } from "../applyFiltersButton/ApplyFiltersButton"

type Props = {
  attributes?: AttributeApi[]
}

export function CategoryAttributes({ attributes }: Props) {
  const draft = useSelector((state: RootState) => state.filters.draft)
  const applied = useSelector((state: RootState) => state.filters.applied)

  const hasDraft = Object.keys(draft).length > 0
  const hasChanges =
    JSON.stringify(draft) !== JSON.stringify(applied)
  console.log("CategoryAttributes attributes", attributes)

  return (
    <>
      <div className="bg-gray-200 p-4 rounded mb-6 flex flex-wrap gap-4">
        {attributes?.map(attr => (
          <AttributeItem
            key={attr.attributeId}
            attributeId={attr.attributeId}
            attributeName={attr.attributeName}
            values={attr.values}
          />
        ))}
      </div>

      {hasDraft && hasChanges && <ApplyFiltersButton />}
    </>
  )
}
