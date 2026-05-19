import type { ProductSize } from "../../types/productTypes"

interface SizeSelectorProps {
  sizes: ProductSize[]
  selectedId: number | null
  onSelect?: (id: number) => void
}

export default function ProductSizes({
  sizes,
  selectedId,
  onSelect
}: SizeSelectorProps) {

  const handleSelect = (size: ProductSize) => {
    if (size.stock === 0) return
    onSelect?.(size.id)
  }

  if (!sizes.length) return null

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Размер</span>

      <div className="flex flex-wrap gap-2">
        {sizes.map(size => {
          const isSelected = selectedId === size.id
          const isOutOfStock = size.stock === 0

          return (
            <button
              key={size.id}
              type="button"
              disabled={isOutOfStock}
              onClick={() => handleSelect(size)}
              className={[
                "min-w-[48px] px-4 py-2 border rounded-md text-sm transition-colors",
                "flex items-center justify-center",
                isSelected
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-black border-gray-300",
                isOutOfStock
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:border-teal-600"
              ].join(" ")}
            >
              {size.size}
            </button>
          )
        })}
      </div>
    </div>
  )
}
