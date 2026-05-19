import { Link } from "react-router-dom"
import type { Product } from "../../types/catalogTypes"
import { ProductRating } from "../product/productRating"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const image = product.variant_images?.[0]

  return (
    <Link
      to={`/product/${product.variant_id}`}
      className="
        flex flex-col gap-2 rounded-xl transition-shadow duration-200
        hover:shadow-xl
      "
    >
      <div className="relative overflow-hidden rounded-xl">
        {image ? (
          <img
            src={image}
            alt={product.product_name}
            className="w-full h-[420px] object-cover"
          />
        ) : (
          <div
            className="
              w-full h-[420px]
              bg-gray-200
              flex items-center justify-center
              text-gray-500 text-sm
            "
          >
            Нет изображения
          </div>
        )}

        <div
          className="
            absolute bottom-2 right-2
            bg-white/90 backdrop-blur-sm
            rounded-lg px-2 py-1 shadow
          "
        >
          <ProductRating
            avg_rating={product.variant_rating ?? 0}
            ratings_number={product.variant_ratings_number ?? 0}
          />
        </div>
      </div>

      <div className="flex flex-col p-2">
        <span className="font-medium">
          {product.product_name}
        </span>

        <span className="text-gray-600">
          {product.variant_price} ₽
        </span>
      </div>
    </Link>
  )
}