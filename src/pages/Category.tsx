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
import { SortSelector } from "../components/sortSelect/SortSelector"
import { Pagination } from "../components/pagination/pagination"
import { skipToken } from "@reduxjs/toolkit/query/react"

export default function Category() {
  const { categoryId, subcategoryId } = useParams<{ categoryId?: string; subcategoryId?: string }>()
  const idToFetch = subcategoryId ?? categoryId
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const appliedFilters = useSelector((s: RootState) => selectAppliedFiltersQuery(s))
  const sortState = useSelector((s: RootState) => s.sort)

  const page = Number(searchParams.get("page") ?? 1)
  const limit = Number(searchParams.get("limit") ?? 20)

  const {
    data: attributes,
    isLoading: attributesLoading,
    error: attributesError,
  } = useGetCategoryAttributesQuery(idToFetch ? Number(idToFetch) : skipToken)

  const queryArgs = idToFetch
    ? {
        categoryId: Number(idToFetch),
        page,
        limit,
        filters: appliedFilters,
        sort: sortState.sort ?? undefined,
        order: sortState.order ?? undefined,
      }
    : skipToken

  const {
    data: productsResponse,
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

      {idToFetch && <SortSelector />}

      <DataLoader
        isLoading={productsLoading}
        error={productsError}
        loadingText="Загрузка товаров..."
        errorText="Ошибка при загрузке товаров"
      >
        {productsResponse && (
          <>
            <ProductGrid
              response={productsResponse}
              onVariantClick={handleVariantClick}
            />

            <Pagination totalPages={productsResponse.meta.totalPages} />
          </>
        )}
      </DataLoader>
    </div>
  )
}
