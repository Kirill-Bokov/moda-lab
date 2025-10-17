import { Button } from "../button/Button"
import type { CategoryCardProps } from "../../types/catalogTypes"

export function CategoryCard({ category, onSubcategoryClick }: CategoryCardProps) {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-start gap-2 bg-white shadow-sm">
      <Button>{category.name}</Button>

      <div className="flex flex-wrap gap-2 mt-2">
        {category.subcategories?.map((sub) => (
          <Button
            key={sub.id}
            onClick={() => onSubcategoryClick(category.id, sub.id)}
          >
            {sub.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
