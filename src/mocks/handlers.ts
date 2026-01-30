import { http, HttpResponse } from "msw"
import { categoriesMock } from "./data/categories.mock"
import { productByIdMock } from "./data/productById.mock"
import { productByCategoryMock } from "./data/productByCategory.mock"
import { categoryAttributesMock } from "./data/attributes.mock"

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
    const filter = url.searchParams.get("filter")
    console.log("MSW getProductsByCategory", { categoryId, filter })
    if (categoryId === 4) {
      const allShirts = Object.values(productByCategoryMock).flat()
      return HttpResponse.json(allShirts)
    }
    const data = productByCategoryMock[categoryId]
    return HttpResponse.json(data)
  }),

  // Получение продукта по variantId
  http.get("*/products/:variantId", ({ params }) => {
    const { variantId } = params
    console.log("MSW getProductById", { variantId })
    return HttpResponse.json(productByIdMock)
  }),
]
