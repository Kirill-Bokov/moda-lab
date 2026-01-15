import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useGetProductByIdQuery } from "../app/api/catalogApi"
import type {
  ProductCard,
  ProductVariant,
  AttributeValue,
  VariantAttributeValue,
  ProductSize,
  ProductImage,
} from "../types/productTypes"

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>()
  const { data, isLoading, error } = useGetProductByIdQuery(Number(productId))
  const imageRefs = useRef<HTMLDivElement[]>([])
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null)

  if (isLoading) return <p>Загрузка товара...</p>
  if (error) return <p>Ошибка при загрузке товара</p>
  if (!data) return <p>Товар не найден</p>

  const product: ProductCard = data
  const selectedVariant: ProductVariant = product.variants[selectedVariantIndex]

  // Инициализация выбранного размера, если ещё не задан
  if (selectedSizeId === null && selectedVariant.sizes.length > 0) {
    setSelectedSizeId(selectedVariant.sizes[0].id)
  }

  const scrollToImage = (index: number) => {
    const ref = imageRefs.current[index]
    if (ref) ref.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleColorChange = (colorId: number) => {
    const idx = product.variants.findIndex((variant) =>
      variant.attributeValues.some(
        (attr: VariantAttributeValue) =>
          attr.value.attribute.id === 2 && attr.value.id === colorId
      )
    )
    if (idx !== -1) setSelectedVariantIndex(idx)
  }

  const availableColors: AttributeValue[] = product.variants
    .map((variant) =>
      variant.attributeValues.find(
        (attr: VariantAttributeValue) => attr.value.attribute.id === 2
      )?.value
    )
    .filter((v): v is AttributeValue => v !== undefined)

  const selectedSizeStock =
    selectedSizeId
      ? selectedVariant.sizes.find((s) => s.id === selectedSizeId)?.stock
      : selectedVariant.sizes.reduce((acc, s) => acc + s.stock, 0)

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-8">
        <div className="flex-1 flex gap-4">
          <div className="flex flex-col gap-2 w-20 sticky top-1/2 -translate-y-1/2 self-start">
            {selectedVariant.images.map((img: ProductImage, index: number) => (
              <img
                key={img.id}
                src={img.url}
                alt={`${product.name} thumbnail ${index}`}
                className="w-full h-20 object-cover rounded cursor-pointer border hover:ring-2 hover:ring-teal-500"
                onClick={() => scrollToImage(index)}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
            {selectedVariant.images.map((img: ProductImage, index: number) => (
              <div
                key={img.id}
                ref={(el) => { if (el) imageRefs.current[index] = el }}
                className="w-full"
              >
                <img
                  src={img.url}
                  alt={`${product.name} ${index}`}
                  className="w-full object-contain rounded border"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 flex-shrink-0 flex flex-col gap-6">
          <div>
            <h1 className="text-xl font-semibold">{product.name}</h1>
            <p className="text-lg font-medium">{selectedVariant.price} ₽</p>
          </div>

          {product.description && (
            <div>
              <h2 className="font-medium mb-1">Описание:</h2>
              <p>{product.description}</p>
            </div>
          )}

          <div>
            <h2 className="font-medium mb-1">В наличии:</h2>
            <p>{selectedSizeStock}</p>
          </div>

          {availableColors.length > 0 && (
            <div>
              <h2 className="font-medium mb-1">Цвет:</h2>
              <div className="flex gap-2 items-center">
                {availableColors.map((color: AttributeValue) => (
                  <button
                    key={color.id}
                    className={`w-8 h-8 rounded-full border-2 ${selectedVariant.attributeValues.some(
                      (attr: VariantAttributeValue) =>
                        attr.value.attribute.id === 2 &&
                        attr.value.id === color.id
                    )
                        ? "border-teal-600"
                        : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color.value.toLowerCase() }}
                    onClick={() => handleColorChange(color.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {selectedVariant.sizes.length > 0 && (
            <div>
              <h2 className="font-medium mb-1">Размеры:</h2>
              <div className="flex flex-wrap gap-2">
                {selectedVariant.sizes.map((size: ProductSize) => (
                  <button
                    key={size.id}
                    className={`px-2 py-1 border rounded text-sm ${size.id === selectedSizeId
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100"
                      }`}
                    onClick={() => setSelectedSizeId(size.id)}
                  >
                    {size.size} ({size.stock})
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedVariant.attributeValues.length > 0 && (
            <div>
              <h2 className="font-medium mb-1">Стиль и материалы:</h2>
              <div className="flex flex-wrap gap-2">
                {selectedVariant.attributeValues
                  .filter((attr: VariantAttributeValue) => attr.value.attribute.id !== 2)
                  .map((attr: VariantAttributeValue, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 border rounded text-sm bg-gray-100"
                    >
                      {attr.value.value}
                    </span>
                  ))}
              </div>
            </div>
          )}

          <button className="w-full bg-teal-600 text-white py-3 font-medium rounded hover:bg-teal-700 transition">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  )
}

