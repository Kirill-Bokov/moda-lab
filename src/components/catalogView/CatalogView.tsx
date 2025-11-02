import { CategoryCard } from "../categoryCard/CategoryCard"
import { goToCategory } from "../../app/features/goToCategory/goToCategory"
import type { NavigateFunction } from "react-router-dom"
import type { Category } from "../../types/catalogTypes"

interface CatalogViewProps {
  categories: Category[]
  navigate: NavigateFunction
}

export function CatalogView({ categories, navigate }: CatalogViewProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Каталог</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-7 auto-rows-fr">
        {categories.map((category) => (
          <div key={category.id} className="flex">
            <CategoryCard
              category={category}
              onCategoryClick={(categoryId: number, subcategoryId?: number) =>
                goToCategory(navigate, categoryId, subcategoryId)
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}
