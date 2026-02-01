import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  useGetCategoryAttributesQuery,
  useGetProductsByCategoryQuery,
} from "../app/api/catalogApi"
import { selectAppliedFiltersQuery } from "../app/selectors/filtersSelectors"
import type { RootState } from "../app/store"
import { DataLoader } from "../components/dataLoader/DataLoader"
import { CategoryAttributes } from "../components/categoryAttributes/CategoryAttributes"
import { ProductGrid } from "../components/productGrid/productGrid"
import { skipToken } from "@reduxjs/toolkit/query/react"

export default function Category() {
  const { categoryId, subcategoryId } = useParams<{ categoryId?: string; subcategoryId?: string }>()
  const idToFetch = subcategoryId ?? categoryId
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryText = searchParams.get("q")

  const appliedFiltersQuery = useSelector((s: RootState) => selectAppliedFiltersQuery(s))

  const {
    data: attributes,
    isLoading: attributesLoading,
    error: attributesError,
  } = useGetCategoryAttributesQuery(idToFetch ? Number(idToFetch) : skipToken)

  const queryArgs = idToFetch
    ? { categoryId: Number(idToFetch), filters: appliedFiltersQuery }
    : skipToken

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsByCategoryQuery(queryArgs)

  const handleVariantClick = (variantId: number) => {
    navigate(`/product/${variantId}`)
  }

  const showSearchQuery = queryText && queryText.length >= 2

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {showSearchQuery && (
        <p className="text-sm text-gray-500">
          Результаты по запросу: <span className="font-medium">{queryText}</span>
        </p>
      )}
      <DataLoader
        isLoading={attributesLoading}
        error={attributesError}
        loadingText="Загрузка атрибутов..."
        errorText="Ошибка при загрузке атрибутов"
      >
        {attributes && <CategoryAttributes attributes={attributes} />}
      </DataLoader>
      <DataLoader
        isLoading={productsLoading}
        error={productsError}
        loadingText="Загрузка товаров..."
        errorText="Ошибка при загрузке товаров"
      >
        {products && (
          <ProductGrid products={products} onVariantClick={handleVariantClick} />
        )}
      </DataLoader>
    </div>
  )
}
