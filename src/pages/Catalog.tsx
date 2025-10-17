import { useGetCategoriesQuery } from "../app/api/catalogApi";
import { CategoryCard } from "../components/categoryCard/CategoryCard";
import { useNavigate } from "react-router-dom";
export default function Catalog() {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const navigate = useNavigate()
  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки категорий</p>;

  if (categories) console.log("Категории с сервера:", categories);
  
  const handleSubcategoryClick = (
    categoryId: number,
    subcategoryId: number
  ) => {
    navigate(`/category/${categoryId}/${subcategoryId}`);
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Каталог</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onSubcategoryClick={handleSubcategoryClick}
          />
        ))}
      </div>
    </div>
  );
}
