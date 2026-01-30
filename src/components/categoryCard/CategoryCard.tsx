import { Button } from "../button/Button";
import type { Category } from "../../types/catalogTypes";

type CategoryCardProps = {
  category: Category;
  onCategoryClick: (categoryId: number, subcategoryId?: number) => void;
};
export function CategoryCard({ category, onCategoryClick }: CategoryCardProps) {
  return (
    <div className="border rounded-lg p-4 flex-1 justify-center gap-2 bg-white shadow-sm h-full hover:shadow-md transition-shadow">
      <div className="flex justify-center">
        <Button
          onClick={() => onCategoryClick(category.id)}
          className="text-lg cursor-pointer"
        >
          {category.name}
        </Button>
      </div>
      <div className="flex-col gap-2 mt-2">
        {category.subcategories?.map((sub) => (
          <Button
            key={sub.id}
            className="flex justify-start text-sm cursor-pointer"
            onClick={() => onCategoryClick(category.id, sub.id)}
          >
            {sub.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
