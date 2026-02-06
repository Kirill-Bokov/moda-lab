import { useParams, useNavigate } from "react-router-dom"
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
import { SortSelector } from "../components/sortSelect/SortSelect"
import { skipToken } from "@reduxjs/toolkit/query/react"

export default function Category() {
  const { categoryId, subcategoryId } = useParams<{ categoryId?: string; subcategoryId?: string }>()
  const idToFetch = subcategoryId ?? categoryId
  const navigate = useNavigate()

  // массив выбранных фильтров [{attributeId, valueId}, ...]
  const appliedFilters = useSelector((s: RootState) => selectAppliedFiltersQuery(s))
  const sortState = useSelector((s: RootState) => s.sort)

  const {
    data: attributes,
    isLoading: attributesLoading,
    error: attributesError,
  } = useGetCategoryAttributesQuery(idToFetch ? Number(idToFetch) : skipToken)

  // формируем query-параметры корректно
  const params: Record<string, any> = {}

  if (appliedFilters && appliedFilters.length > 0) {
    params.filter = appliedFilters // передаем массив напрямую, без JSON.stringify
  }

  if (sortState.sort && sortState.order) {
    params.sort = sortState.sort
    params.order = sortState.order
  }

  const queryArgs = idToFetch
    ? { categoryId: Number(idToFetch), filters: params }
    : skipToken

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsByCategoryQuery(queryArgs)

  const handleVariantClick = (variantId: number) => {
    navigate(`/product/${variantId}`)
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <DataLoader
        isLoading={attributesLoading}
        error={attributesError}
        loadingText="Загрузка атрибутов..."
        errorText="Ошибка при загрузке атрибутов"
      >
        {attributes && <CategoryAttributes attributes={attributes} />}
      </DataLoader>

      {/* Сортировка */}
      {idToFetch && <SortSelector />}

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
