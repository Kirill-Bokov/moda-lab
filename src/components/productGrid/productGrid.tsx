import { ProductCard } from "../productCard/productCard"
import type { Product } from "../../types/catalogTypes"

export interface ProductGridProps {
  items: Product[]
  onVariantClick: (variantId: number) => void
}

export function ProductGrid({ items, onVariantClick }: ProductGridProps) {
  if (!items || items.length === 0) {
    return <p>Товары не найдены</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {items.map(product => (
        <ProductCard
          key={product.variant_id}
          product={product}
          onClick={() => onVariantClick(product.variant_id)}
        />
      ))}
    </div>
  )
}
