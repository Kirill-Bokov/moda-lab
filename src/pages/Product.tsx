import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../app/api/catalogApi";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, error } = useGetProductByIdQuery(Number(productId));
  const imageRefs = useRef<HTMLDivElement[]>([]);

  if (isLoading) return <p>Загрузка товара...</p>;
  if (error) return <p>Ошибка при загрузке товара</p>;
  if (!data) return <p>Товар не найден</p>;

  const product = data;

  const scrollToImage = (index: number) => {
    const ref = imageRefs.current[index];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
<div className="container mx-auto px-4 py-6">
  <div className="flex gap-8">
    {/* Левая + центральная колонки: левая закреплённая карусель и прокручиваемые фото */}
    <div className="flex-1 flex gap-4">
      {/* Левая колонка: закреплённая карусель */}
      <div className="flex flex-col gap-2 w-20 sticky top-1/2 -translate-y-1/2 self-start">
        {product.imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${product.name} thumbnail ${index}`}
            className="w-full h-20 object-cover rounded cursor-pointer border hover:ring-2 hover:ring-teal-500"
            onClick={() => scrollToImage(index)}
          />
        ))}
      </div>

      {/* Центральная колонка: прокручиваемые фото */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        {product.imageUrls.map((url, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) imageRefs.current[index] = el;
            }}
            className="w-full"
          >
            <img
              src={url}
              alt={`${product.name} ${index}`}
              className="w-full object-contain rounded border"
            />
          </div>
        ))}
      </div>
    </div>

    {/* Правая колонка: информация о товаре */}
    <div className="w-1/2 flex-shrink-0 flex flex-col gap-4">
      <h1 className="text-xl font-semibold">{product.name}</h1>
      <p className="text-lg font-medium">{product.price} ₽</p>
      <p>{product.description}</p>
      <p className="text-sm text-gray-600">В наличии: {product.count}</p>
      <button className="w-full bg-teal-600 text-white py-3 font-medium rounded hover:bg-teal-700 transition">
        Добавить в корзину
      </button>
    </div>
  </div>
</div>

  );
}
