import { useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetProductByIdQuery } from "../app/api/catalogApi"
import type { ProductCard, ProductVariant } from "../types/productTypes"

import { ProductImageGallery } from "../components/product/productImageGallery"
import { ProductTitle } from "../components/product/productTitle"
import { ProductDescription } from "../components/product/productDescription"
import { ProductColorSelector } from "../components/product/productColorSelector"
import { ProductAddToCartButton } from "../components/product/productAddToCartButton"
import { ProductShare } from "../components/product/productShare"

export default function ProductPage() {
  const { variantId } = useParams<{ variantId?: string }>()
  const navigate = useNavigate()
  const variantIdNumber = Number(variantId)

  const { data, isLoading, error } =
    useGetProductByIdQuery(variantIdNumber)

  const imageRefs = useRef<HTMLDivElement[]>([])

  if (isLoading) return <p>Загрузка товара...</p>
  if (error) return <p>Ошибка при загрузке товара</p>
  if (!data) return <p>Товар не найден</p>

  const product: ProductCard = data

  const activeVariant: ProductVariant =
    product.variants.find(v => v.id === variantIdNumber)
    ?? product.variants[0]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-8">
        <ProductImageGallery
          productName={product.name}
          images={activeVariant.images}
          imageRefs={imageRefs}
        />

        <div className="w-1/2 flex flex-col gap-6">
          <ProductTitle
            name={product.name}
            price={activeVariant.price}
            sku={activeVariant.sku}
          />

          <ProductColorSelector
            variants={product.variants}
            activeVariantId={activeVariant.id}
            onSelect={id => navigate(`/product/${id}`)}
          />
          <ProductDescription
            description={product.description}
            attributeValues={activeVariant.attributeValues}
          />
          <ProductAddToCartButton
            variantId={activeVariant.id}
          />
          <ProductShare
            sku={activeVariant.sku}
          />
        </div>
      </div>
    </div>
  )
}
