import { useRef } from "react"
import { useParams } from "react-router-dom"
import { useGetProductByIdQuery } from "../app/api/catalogApi"
import type { ProductCard, ProductVariant, ProductImage } from "../types/productTypes"

export default function ProductPage() {
  const { variantId } = useParams<{ variantId?: string }>()
  const variantIdNumber = variantId ? Number(variantId) : 0

  const { data: productData, isLoading, error } = useGetProductByIdQuery(
    variantIdNumber || 0
  )

  const imageRefs = useRef<HTMLDivElement[]>([])

  if (isLoading) return <p>Загрузка товара...</p>
  if (error) return <p>Ошибка при загрузке товара</p>
  if (!productData) return <p>Товар не найден</p>

  const product: ProductCard = productData
  const variant: ProductVariant = product.variants[0] 

  const scrollToImage = (index: number) => {
    const ref = imageRefs.current[index]
    if (ref) ref.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-8">
        <div className="flex-1 flex gap-4">
          <div className="flex flex-col gap-2 w-20 sticky top-1/2 -translate-y-1/2 self-start">
            {variant.images.map((img: ProductImage, idx: number) => (
              <img
                key={img.id}
                src={img.url}
                alt={`${product.name} thumbnail ${idx}`}
                className="w-full h-20 object-cover rounded cursor-pointer border hover:ring-2 hover:ring-teal-500"
                onClick={() => scrollToImage(idx)}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
            {variant.images.map((img: ProductImage, idx: number) => (
              <div
                key={img.id}
                ref={(el) => { if (el) imageRefs.current[idx] = el }}
                className="w-full"
              >
                <img
                  src={img.url}
                  alt={`${product.name} ${idx}`}
                  className="w-full object-contain rounded border"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 flex-shrink-0 flex flex-col gap-6">
          <div>
            <h1 className="text-xl font-semibold">{product.name}</h1>
            <p className="text-lg font-medium">{variant.price} ₽</p>
          </div>

          {product.description && (
            <div>
              <h2 className="font-medium mb-1">Описание:</h2>
              <p>{product.description}</p>
            </div>
          )}

          {variant.attributeValues.length > 0 && (
            <div>
              <h2 className="font-medium mb-1">Стиль и материалы:</h2>
              <div className="flex flex-wrap gap-2">
                {variant.attributeValues.map((attr, idx) => (
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
