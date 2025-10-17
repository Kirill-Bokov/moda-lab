import { useParams, useNavigate } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../app/api/catalogApi";
import { useState } from "react";

export default function Category() {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery({
    categoryId: Number(subcategoryId),
  });

  if (isLoading) return <p>Загрузка товаров...</p>;
  if (error) return <p>Ошибка при загрузке товаров</p>;

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">

      {/* Панель фильтров */}
      <div className="bg-gray-200 p-4 rounded mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-sm font-medium mb-2">
          <button className="text-left">Сортировка ↓</button>
          <button className="text-left">Основной материал</button>
          <button className="text-left">Цвет</button>
          <button className="text-left">Размер</button>
          <button className="text-left">Цена</button>
          <button className="text-left">Тип</button>
          <button
            className="text-left"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Все фильтры ↓
          </button>
        </div>
        {showFilters && (
          <div className="space-y-2 text-sm font-medium mt-2 animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              <button className="text-left">Доп материалы</button>
              <button className="text-left">Тип пояса</button>
              <button className="text-left">Паховая область</button>
              <button className="text-left">Внешний шов</button>
              <button className="text-left">Посадка</button>
              <button className="text-left">Стиль</button>
              <button className="text-left">Утепление</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              <button className="text-left">Плотность ткани</button>
              <button className="text-left">Тип карманов</button>
              <button className="text-left">Обхват талии</button>
              <button className="text-left">Обхват бёдер</button>
              <button className="text-left">Низ штанины</button>
              <button className="text-left">Тип застёжек</button>
              <button className="text-left">Паховая область</button>
            </div>
          </div>
        )}
      </div>

      {/* Сетка товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="w-full aspect-[4/5] mb-2 overflow-hidden rounded">
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-medium">{product.name}</p>
            <p className="text-gray-700">{product.price} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
}
