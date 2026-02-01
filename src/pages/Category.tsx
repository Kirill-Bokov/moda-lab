import { useParams, useNavigate, useLocation } from "react-router-dom"
import {
  useGetCategoryAttributesQuery,
  useGetProductsByCategoryQuery,
} from "../app/api/catalogApi"
import { useSelector } from "react-redux"
import type { RootState } from "../app/store"
import { DataLoader } from "../components/dataLoader/DataLoader"
import { CategoryAttributes } from "../components/categoryAttributes/CategoryAttributes"
import { ProductGrid } from "../components/productGrid/productGrid"
import { skipToken } from "@reduxjs/toolkit/query/react"
import { selectAppliedFiltersQuery } from "../app/selectors/filtersSelectors"
import type { Product } from "../types/catalogTypes"

export default function Category() {
  const { categoryId, subcategoryId } = useParams<{
    categoryId?: string
    subcategoryId?: string
  }>()
  const idToFetch = subcategoryId ?? categoryId
  const navigate = useNavigate()
  const location = useLocation()
  const searchResults = location.state?.searchResults as Product[] | undefined
  const fromSearch = location.state?.fromSearch as boolean | undefined

  const appliedFiltersQuery = useSelector((s: RootState) =>
    selectAppliedFiltersQuery(s)
  )

  const {
    data: attributes,
    isLoading: attributesLoading,
    error: attributesError,
  } = useGetCategoryAttributesQuery(idToFetch ? Number(idToFetch) : skipToken)

  const queryArgs = idToFetch
    ? {
      categoryId: Number(idToFetch),
      filters: appliedFiltersQuery,
    }
    : skipToken

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsByCategoryQuery(queryArgs, {
    skip: fromSearch && !!searchResults,
  })

  const displayProducts = fromSearch && searchResults ? searchResults : products

  const handleVariantClick = (variantId: number) => {
    navigate(`/product/${variantId}`)
  }

  console.log("Категория:", idToFetch)
  console.log("Применённые фильтры:", appliedFiltersQuery)
  console.log("Из поиска:", fromSearch)
  console.log("Продукты:", displayProducts)

  return (
    <div className="container mx-auto px-4 py-6">
      <DataLoader
        isLoading={attributesLoading}
        error={attributesError}
        loadingText="Загрузка атрибутов..."
        errorText="Ошибка при загрузке атрибутов"
      >
        {attributes && <CategoryAttributes attributes={attributes} />}
      </DataLoader>

      <DataLoader
        isLoading={!fromSearch && productsLoading}
        error={productsError}
        loadingText="Загрузка товаров..."
        errorText="Ошибка при загрузке товаров"
      >
        {displayProducts && (
          <ProductGrid products={displayProducts} onVariantClick={handleVariantClick} />
        )}
      </DataLoader>
    </div>
  )
}