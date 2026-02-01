import type { SearchResponse } from "../../types/searchTypes"

export const searchProductsMock: Record<string, SearchResponse> = {
  // Поиск "рубашка" - без фильтров
  "рубашка": {
    query: "рубашка",
    products: [
      {
        product_id: 101,
        product_name: "Рубашка классическая белая",
        product_description: "Классическая белая рубашка из хлопка",
        product_categoryId: 4,
        variant_id: 1001,
        variant_images: "https://via.placeholder.com/300x400/FFFFFF/000000?text=White+Shirt",
        variant_price: "2500.00",
        variant_sku: "SHIRT-WHITE-M",
        variant_stock: "15",
        sizes: "M,L,XL",
      },
      {
        product_id: 102,
        product_name: "Рубашка деловая синяя",
        product_description: "Деловая синяя рубашка",
        product_categoryId: 4,
        variant_id: 1002,
        variant_images: "https://via.placeholder.com/300x400/0000FF/FFFFFF?text=Blue+Shirt",
        variant_price: "2800.00",
        variant_sku: "SHIRT-BLUE-L",
        variant_stock: "20",
        sizes: "S,M,L",
      },
    ],
    total: 2,
    categoryId: 4,
    appliedFilters: [],
  },

  // Поиск "зелёная рубашка" - с фильтром по цвету
  "зелёная рубашка": {
    query: "зелёная рубашка",
    products: [
      {
        product_id: 103,
        product_name: "Рубашка оверсайз зелёная",
        product_description: "Стильная зелёная рубашка оверсайз",
        product_categoryId: 4,
        variant_id: 1003,
        variant_images: "https://via.placeholder.com/300x400/00FF00/000000?text=Green+Shirt",
        variant_price: "3200.00",
        variant_sku: "SHIRT-GREEN-L",
        variant_stock: "10",
        sizes: "M,L",
      },
      {
        product_id: 104,
        product_name: "Рубашка классическая зелёная",
        product_description: "Классическая рубашка зелёного цвета",
        product_categoryId: 4,
        variant_id: 1004,
        variant_images: "https://via.placeholder.com/300x400/228B22/FFFFFF?text=Green+Classic",
        variant_price: "2700.00",
        variant_sku: "SHIRT-GREEN-M",
        variant_stock: "8",
        sizes: "S,M,L,XL",
      },
    ],
    total: 2,
    categoryId: 4,
    appliedFilters: [
      {
        attributeId: "2",
        valueId: "7",
      },
    ],
  },

  // Поиск "джинсы" - другая категория
  "джинсы": {
    query: "джинсы",
    products: [
      {
        product_id: 201,
        product_name: "Джинсы прямые синие",
        product_description: "Классические прямые джинсы",
        product_categoryId: 8,
        variant_id: 2001,
        variant_images: "https://via.placeholder.com/300x400/000080/FFFFFF?text=Jeans",
        variant_price: "4500.00",
        variant_sku: "JEANS-BLUE-32",
        variant_stock: "25",
        sizes: "30,32,34,36",
      },
      {
        product_id: 202,
        product_name: "Джинсы скинни черные",
        product_description: "Облегающие джинсы скинни",
        product_categoryId: 8,
        variant_id: 2002,
        variant_images: "https://via.placeholder.com/300x400/000000/FFFFFF?text=Black+Skinny",
        variant_price: "3900.00",
        variant_sku: "JEANS-BLACK-30",
        variant_stock: "18",
        sizes: "28,30,32",
      },
    ],
    total: 2,
    categoryId: 8,
    appliedFilters: [],
  },

  // Поиск "красное платье размер M" - несколько фильтров
  "красное платье размер M": {
    query: "красное платье размер M",
    products: [
      {
        product_id: 301,
        product_name: "Платье вечернее красное",
        product_description: "Элегантное вечернее платье",
        product_categoryId: 12,
        variant_id: 3001,
        variant_images: "https://via.placeholder.com/300x400/FF0000/FFFFFF?text=Red+Dress",
        variant_price: "5500.00",
        variant_sku: "DRESS-RED-M",
        variant_stock: "5",
        sizes: "S,M,L",
      },
    ],
    total: 1,
    categoryId: 12,
    appliedFilters: [
      {
        attributeId: "2",
        valueId: "12",
      },
      {
        attributeId: "6",
        valueId: "24",
      },
    ],
  },

  // Поиск без результатов
  "фиолетовые кроссовки": {
    query: "фиолетовые кроссовки",
    products: [],
    total: 0,
    categoryId: 0,
    appliedFilters: [],
  },
}