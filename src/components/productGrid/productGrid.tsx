import { useSearchParams } from "react-router-dom"
import { ProductCard } from "../productCard/productCard"
import type { Product, ProductsByCategoryResponse } from "../../types/catalogTypes"

export interface ProductGridProps {
  response: ProductsByCategoryResponse
  onVariantClick: (variantId: number) => void
}

export function ProductGrid({ response, onVariantClick }: ProductGridProps) {
  const [, setSearchParams] = useSearchParams()
  const items: Product[] = response.items
  const meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  } = response.meta

  if (!items || items.length === 0) {
    return <p>Товары не найдены</p>
  }

  const goToPage = (page: number): void => {
    setSearchParams((prev: URLSearchParams): URLSearchParams => {
      prev.set("page", String(page))
      prev.set("limit", String(meta.limit))
      return prev
    })
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((product: Product) => (
          <ProductCard
            key={product.variant_id}
            product={product}
            onClick={(): void => onVariantClick(product.variant_id)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: meta.totalPages }).map((_, i: number) => {
          const page: number = i + 1
          return (
            <button
              key={page}
              disabled={page === meta.page}
              onClick={(): void => goToPage(page)}
            >
              {page}
            </button>
          )
        })}
      </div>
    </>
  )
}
