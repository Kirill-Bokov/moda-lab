import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../app/api/catalogApi";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, error } = useGetProductByIdQuery(Number(productId));
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  if (isLoading) return <p>Загрузка товара...</p>;
  if (error) return <p>Ошибка при загрузке товара</p>;
  if (!data) return <p>Товар не найден</p>;

  const product = data;

  // Выбранный вариант
  const selectedVariant = product.variants[selectedVariantIndex];

  const scrollToImage = (index: number) => {
    const ref = imageRefs.current[index];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-8">
        {/* Левая + центральная колонки: карусель и прокручиваемые фото */}
        <div className="flex-1 flex gap-4">
          {/* Левая колонка: закреплённая карусель */}
          <div className="flex flex-col gap-2 w-20 sticky top-1/2 -translate-y-1/2 self-start">
            {selectedVariant.images.map((img, index) => (
              <img
                key={img.id}
                src={img.url}
                alt={`${product.name} thumbnail ${index}`}
                className="w-full h-20 object-cover rounded cursor-pointer border hover:ring-2 hover:ring-teal-500"
                onClick={() => scrollToImage(index)}
              />
            ))}
          </div>

          {/* Центральная колонка: прокручиваемые фото */}
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
            {selectedVariant.images.map((img, index) => (
              <div
                key={img.id}
                ref={(el) => {
                  if (el) imageRefs.current[index] = el;
                }}
                className="w-full"
              >
                <img
                  src={img.url}
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
          <p className="text-lg font-medium">{selectedVariant.price} ₽</p>
          <p>{product.description}</p>
          <p className="text-sm text-gray-600">В наличии: {selectedVariant.stock}</p>

          {/* Список размеров и других атрибутов можно будет добавить здесь */}
          {selectedVariant.attributeValues?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedVariant.attributeValues.map((attr, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 border rounded text-sm bg-gray-100"
                >
                  {attr.value || "безымянный атрибут"}
                </span>
              ))}
            </div>
          )}

          <button className="w-full bg-teal-600 text-white py-3 font-medium rounded hover:bg-teal-700 transition">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
}
