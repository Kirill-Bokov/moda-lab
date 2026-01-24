import { ProductCard } from "../productCard/productCard";
import type { Product } from "../../types/catalogTypes";

type ProductGridProps = {
  products?: Product[];
  onVariantClick: (variantId: number) => void; 
};

export function ProductGrid({ products, onVariantClick }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <p>База данных пуста</p>;
  }
console.log("ProductGrid products:", products)
  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.variant_id}
          product={product}
          onClick={() => onVariantClick(product.variant_id)} 
        />
      ))}
    </div>
  );
}
