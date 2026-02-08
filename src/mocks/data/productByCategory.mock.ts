const SHIRT_IMAGE =
  "https://img.ostin.com/upload/mdm/media_content/resize/ed5/867_1200_ba5a/172474120299.jpg?7"

import type { ProductsByCategoryResponse, Product } from "../../types/catalogTypes"

export const generateProducts = (categoryId: number, total: number = 50): Product[] => {
  const items: Product[] = []
  for (let i = 0; i < total; i++) {
    const productId = 100 + (i % 10)
    items.push({
      product_id: productId,
      product_name: `Рубашка тестовая ${productId}`,
      product_categoryId: categoryId,
      variant_id: i + 1000,
      variant_sku: `TEST${productId}-${i}`,
      variant_price: (2990 + (i % 5) * 100).toFixed(2),
      variant_images: [SHIRT_IMAGE],
    })
  }
  return items
}

export const productByCategoryMock: Record<number, ProductsByCategoryResponse> = [401, 402, 403, 404, 405].reduce(
  (acc, categoryId) => {
    const allItems = generateProducts(categoryId)
    const limit = 20
    acc[categoryId] = {
      items: allItems.slice(0, limit),
      meta: {
        total: allItems.length,
        page: 1,
        limit,
        totalPages: Math.ceil(allItems.length / limit),
      },
    }
    return acc
  },
  {} as Record<number, ProductsByCategoryResponse>
)
