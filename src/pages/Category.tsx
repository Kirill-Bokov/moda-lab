import { useParams, useNavigate } from "react-router-dom";
import {
  useGetCategoryAttributesQuery,
  useGetProductsByCategoryQuery,
} from "../app/api/catalogApi";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { DataLoader } from "../components/dataLoader/DataLoader";
import { CategoryAttributes } from "../components/categoryAttributes/categoryAttributes";
import { ProductGrid } from "../components/productGrid/productGrid";

export default function Category() {
  const gender = useSelector((state: RootState) => state.gender.value);
  const { categoryId, subcategoryId } = useParams<{
    categoryId?: string;
    subcategoryId?: string;
  }>();
  const idToFetch = subcategoryId ?? categoryId;
  const navigate = useNavigate();

  const { data: products, isLoading: productsLoading, error: productsError } =
    useGetProductsByCategoryQuery({
      categoryId: Number(idToFetch),
      gender
    });

  const {
    data: attributes,
    isLoading: attributesLoading,
    error: attributesError,
  } = useGetCategoryAttributesQuery(Number(idToFetch));

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <DataLoader
        isLoading={attributesLoading}
        error={attributesError}
        loadingText="Загрузка атрибутов..."
        errorText="Ошибка при загрузке атрибутов"
      >
        <CategoryAttributes attributes={attributes} />
      </DataLoader>

      <DataLoader
        isLoading={productsLoading}
        error={productsError}
        loadingText="Загрузка товаров..."
        errorText="Ошибка при загрузке товаров"
      >
        <ProductGrid products={products} onProductClick={handleProductClick} />
      </DataLoader>
    </div>
  );
}
