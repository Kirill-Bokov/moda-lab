import { useState } from "react"
import { ShowAllFiltersButton } from "./ShowAllFiltersButton"
import type { AttributeApi } from "../../types/catalogTypes"
import { AttributeItem } from "../attributeItem/AttributeItem"
import { ColorItem } from "../attributeItem/ColorItem"
import { BASE_ATTRIBUTE_NAMES, GENDER_ATTRIBUTE_ID, COLOR_ATTRIBUTE_ID } from "../../app/constants"

type Props = {
  attributes?: AttributeApi[]
}

export function CategoryAttributes({ attributes }: Props) {
  const [expanded, setExpanded] = useState(false)

  const filteredAttributes = attributes?.filter(
    attr => attr.attributeId != GENDER_ATTRIBUTE_ID
  )

  const baseAttributes = filteredAttributes?.filter(attr =>
    BASE_ATTRIBUTE_NAMES.includes(attr.attributeName)
  )

  const extraAttributes = filteredAttributes?.filter(
    attr => !BASE_ATTRIBUTE_NAMES.includes(attr.attributeName)
  )

  const renderAttribute = (attr: AttributeApi) => {
    if (attr.attributeId == COLOR_ATTRIBUTE_ID) {
      return <ColorItem key={attr.attributeId} attribute={attr} />
    }
    return (
      <AttributeItem
        key={attr.attributeId}
        attributeId={attr.attributeId}
        attributeName={attr.attributeName}
        values={attr.values}
      />
    )
  }

  return (
    <>
      <div className="bg-gray-200 p-4 rounded mb-6 flex flex-wrap gap-4">
        {baseAttributes?.map(attr => renderAttribute(attr))}

        <ShowAllFiltersButton expanded={expanded} setExpanded={setExpanded} />

        {expanded && (
          <div className="w-full flex flex-wrap gap-4 mt-2">
            {extraAttributes?.map(attr => renderAttribute(attr))}
          </div>
        )}
      </div>
    </>
  )
}
