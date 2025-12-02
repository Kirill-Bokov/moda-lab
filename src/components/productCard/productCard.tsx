import type { Product } from "../../types/catalogTypes";

type ProductCardProps = {
  product: Product;
  onClick: (id: number) => void;
};

export function ProductCard({ product, onClick }: ProductCardProps) {
  const firstImageUrl = product.variant_images
  ? product.variant_images.split(",")[0].trim()
  : undefined;

  return (
    <div
      className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition"
      onClick={() => onClick(product.product_id)}
    >
      <div className="w-full aspect-[4/5] mb-2 overflow-hidden rounded">
        {firstImageUrl ? (
          <img
            src={firstImageUrl}
            alt={product.product_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            Нет изображения
          </div>
        )}
      </div>
      <p className="font-medium">{product.product_name}</p>
      <p className="text-gray-700">{product.variant_price} ₽</p>
      {product.sizes && <p className="text-gray-500 text-sm">Размеры: {product.sizes}</p>}
    </div>
  );
}

