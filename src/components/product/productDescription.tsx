import type { VariantAttributeValue } from "../../types/productTypes"

type Props = {
  description?: string
  attributeValues: VariantAttributeValue[]
}

export function ProductDescription({
  description,
  attributeValues,
}: Props) {
  const filteredAttributes = attributeValues.filter(
    attr => attr.value.attribute.name !== "Цвет"
  )

  return (
    <>
      {description && (
        <div>
          <h2 className="font-medium mb-1">Описание</h2>
          <p>{description}</p>
        </div>
      )}

      {filteredAttributes.length > 0 && (
        <div>
          <h2 className="font-medium mb-1">Характеристики</h2>
          <div className="flex flex-col gap-1">
            {filteredAttributes.map(attr => (
              <div key={attr.id} className="text-sm">
                <span className="font-medium">
                  {attr.value.attribute.name}
                </span>
                {" — "}
                <span>{attr.value.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
