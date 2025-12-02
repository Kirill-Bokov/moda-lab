import { ProductCard } from "../productCard/productCard";
import type { Product } from "../../types/catalogTypes";

type ProductGridProps = {
  products?: Product[];
  onProductClick: (id: number) => void;
};

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard
          key={product.variant_id}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
}
