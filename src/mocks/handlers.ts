import { http, HttpResponse } from "msw"
import { categoriesMock } from "./data/categories.mock"
import { productByIdMock } from "./data/productById.mock"
import { categoryAttributesMock } from "./data/attributes.mock"
import { searchProductsMock } from "./data/searchProducts.mock"
import { generateProducts } from "./data/productByCategory.mock"
export const handlers = [
  http.get("*/categories", ({ request }) => {
    const url = new URL(request.url)
    const gender = url.searchParams.get("gender")

    console.log("MSW getCategories", { gender })

    const filteredCategories = categoriesMock.map(cat => ({
      ...cat,
      subcategories: cat.subcategories.map(sub => ({ ...sub })),
    }))

    return HttpResponse.json(filteredCategories)
  }),

  // Получение атрибутов категории
  http.get("*/categories/attributes/:categoryId", ({ params }) => {
    const { categoryId } = params
    console.log("MSW getCategoryAttributes", { categoryId })
    return HttpResponse.json(categoryAttributesMock)
  }),

  // Получение продуктов по категории
  http.get("*/products/category/:categoryId", ({ params, request }) => {
  const categoryId = Number(params.categoryId)
  const url = new URL(request.url)
  const page = Number(url.searchParams.get("page") ?? 1)
  const limit = Number(url.searchParams.get("limit") ?? 20)

  const allItems = generateProducts(categoryId)
  const pagedItems = allItems.slice((page - 1) * limit, page * limit)

  return HttpResponse.json({
    items: pagedItems,
    meta: {
      total: allItems.length,
      page,
      limit,
      totalPages: Math.ceil(allItems.length / limit),
    },
  })
}),

  // Получение продукта по variantId
  http.get("*/products/:variantId", ({ params }) => {
    const { variantId } = params
    console.log("MSW getProductById", { variantId })
    return HttpResponse.json(productByIdMock)
  }),

  // Поиск продуктов
  http.get("*/search", ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get("q") || ""

    console.log("MSW searchProducts", { query })

    // Ищем точное совпадение или возвращаем пустой результат
    const result = searchProductsMock[query] || {
      query,
      products: [],
      total: 0,
      categoryId: 0,
      appliedFilters: [],
    }

    return HttpResponse.json(result)
  }),
]
