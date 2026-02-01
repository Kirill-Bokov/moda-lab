import { useSearchParams, useNavigate } from "react-router-dom"
import { useSearchProductsQuery } from "../app/api/catalogApi"
import { DataLoader } from "../components/dataLoader/DataLoader"
import { ProductGrid } from "../components/productGrid/productGrid"

export default function SearchPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const query = params.get("q")?.trim() ?? ""

  const {
    data,
    isLoading,
    error,
  } = useSearchProductsQuery(query, {
    skip: query.length < 2,
  })

  const handleVariantClick = (variantId: number) => {
    navigate(`/product/${variantId}`)
  }

  const handleGoToCategory = () => {
    if (!data?.categoryId) return
    navigate(`/category/${data.categoryId}?q=${encodeURIComponent(query)}`)
  }

  if (query.length < 2) {
    return <p>Введите минимум 2 символа</p>
  }

  return (
    <div className="space-y-4">
      <DataLoader
        isLoading={isLoading}
        error={error}
        loadingText="Поиск товаров..."
        errorText="Ошибка поиска"
      >
        {data && (
          <>
            <ProductGrid
              products={data.products}
              onVariantClick={handleVariantClick}
            />

            {data.categoryId > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={handleGoToCategory}
                  className="mt-4 rounded-md border px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Больше в категории
                </button>
              </div>
            )}
          </>
        )}
      </DataLoader>
    </div>
  )
}

