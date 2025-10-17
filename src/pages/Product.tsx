import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../app/api/catalogApi";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, error } = useGetProductByIdQuery(Number(productId));

  if (isLoading) return <p>Загрузка товара...</p>;
  if (error) return <p>Ошибка при загрузке товара</p>;
  if (!data) return <p>Товар не найден</p>;

  const { product } = data;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-2 sm:w-20 w-full sm:flex-shrink-0">
            {product.imageUrls.map((url: string, index: number) => (
              <img
                key={index}
                src={url}
                alt={`${product.name} thumbnail ${index}`}
                className="w-full sm:w-20 h-20 object-cover rounded cursor-pointer border"
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={product.imageUrls[0]}
              alt={product.name}
              className="w-full aspect-square object-cover rounded border"
            />
          </div>
        </div>

        {/* Правая часть: информация */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold mb-2">{product.name}</h1>
          <p className="text-lg font-medium mb-4">{product.price} ₽</p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4 text-sm text-gray-600">
            В наличии: {product.count}
          </p>

          <button
            type="button"
            className="w-full bg-teal-600 text-white py-3 font-medium rounded hover:bg-teal-700 transition mb-6"
          >
            Добавить в корзину
          </button>

          {/* Характеристики товара */}
          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Описание и характеристики</h2>
            <ul className="text-sm space-y-1">
              <li>Высокая посадка</li>
              <li>Классический стиль</li>
              <li>Пояс на петлях</li>
              <li>Накладные карманы</li>
              <li>Застёжка молния</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 text-sm gap-x-8 gap-y-1">
            <p className="font-medium">Состав:</p>
            <p>Хлопок 98%, Эластан 2%</p>
            <p className="font-medium">Плотность:</p>
            <p>220 г/м²</p>
            <p className="font-medium">Размер модели на фото:</p>
            <p>S</p>
            <p className="font-medium">Рост модели:</p>
            <p>175 см</p>
            <p className="font-medium">Параметры модели:</p>
            <p>80 / 63 / 90</p>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-2">Уход за одеждой</h2>
            <div className="flex gap-4">
              <div className="w-10 h-10 border rounded" />
              <div className="w-10 h-10 border rounded" />
              <div className="w-10 h-10 border rounded" />
              <div className="w-10 h-10 border rounded" />
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-2">Поделиться</h2>
            <div className="flex gap-4">
              <div className="w-8 h-8 border rounded" />
              <div className="w-8 h-8 border rounded" />
              <div className="w-8 h-8 border rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
