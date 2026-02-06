import type { AttributeApi } from "../../types/catalogTypes"

type Props = {
  attribute: AttributeApi
}

export function ColorItem({ attribute }: Props) {
  return (
    <div className="min-w-[200px]">
      <span className="block mb-1 font-medium">
        {attribute.attributeName}
      </span>
      <div className="text-sm text-gray-500">
        Color filter placeholder
      </div>
    </div>
  )
}
