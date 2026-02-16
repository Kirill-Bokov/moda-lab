import type { ProductVariant } from "../../types/productTypes"
import { colorNameToCss } from "../../app/features/colorToName/colorToName"

type Props = {
  variants: ProductVariant[]
  activeVariantId: number
  onSelect: (id: number) => void
}

export function ProductColorSelector({
  variants,
  activeVariantId,
  onSelect,
}: Props) {
  const getColor = (variant: ProductVariant) =>
    variant.attributeValues.find(
      a => a.value.attribute.name === "Цвет"
    )?.value.value

  return (
    <div>
      <h2 className="font-medium mb-1">Цвет</h2>
      <div className="flex gap-2">
        {variants.map(v => {
          const colorName = getColor(v)
          const bgColor = colorNameToCss(colorName)

          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              title={colorName}
              className={`w-6 h-6 rounded-full border transition ${
                v.id === activeVariantId
                  ? "border-teal-600"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: bgColor }}
            />
          )
        })}
      </div>
    </div>
  )
}
