import { useRef, useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetProductByIdQuery } from "../app/api/productApi"
import type { ProductCard } from "../types/productTypes"

import { ProductImageGallery } from "../components/product/productImageGallery"
import { ProductTitle } from "../components/product/productTitle"
import { ProductDescription } from "../components/product/productDescription"
import { ProductColorSelector } from "../components/product/productColorSelector"
import { ProductAddToCartButton } from "../components/product/productAddToCartButton"
import { ProductShare } from "../components/product/productShare"
import ProductSizes from "../components/product/productSizes"

export default function ProductPage() {
  const { variantId } = useParams<{ variantId?: string }>()
  const navigate = useNavigate()
  const variantIdNumber = Number(variantId)

  const { data, isLoading, error } =
    useGetProductByIdQuery(variantIdNumber)

  const imageRefs = useRef<HTMLDivElement[]>([])
  const [selectedSize, setSelectedSize] = useState<number | null>(null)

  const product = data as ProductCard | undefined

  const activeVariant =
    product?.variants.find(v => v.id === variantIdNumber)
    ?? product?.variants[0]

  useEffect(() => {
    if (activeVariant) {
      setSelectedSize(null)
    }
  }, [activeVariant?.id])

  if (isLoading) return <p>Загрузка товара...</p>
  if (error) return <p>Ошибка при загрузке товара</p>
  if (!product || !activeVariant) return <p>Товар не найден</p>
    
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

          <ProductSizes
            sizes={activeVariant.sizes}
            selectedId={selectedSize}
            onSelect={(id) => setSelectedSize(id)}
          />

          <ProductAddToCartButton
            variantId={activeVariant.id}
            selectedSizeId={selectedSize}
          />

          <ProductShare
            sku={activeVariant.sku}
          />
        </div>
      </div>
    </div>
  )
}
