import { http, HttpResponse } from "msw"
import { categoriesMock } from "./data/categories.mock"
import { productByIdMock } from "./data/productById.mock"
import { categoryAttributesMock } from "./data/attributes.mock"
import { searchProductsMock } from "./data/searchProducts.mock"
import { generateProducts } from "./data/productByCategory.mock"
import { citiesMock } from "./data/cities.mock"

let shouldReturn401 = true

const requireAuth = (request: Request) => {
  const authHeader = request.headers.get("authorization")
  return authHeader === "Bearer mock_access_token"
}

export const handlers = [
  // Refresh токена
  http.post("*/auth/refresh", () => {
    return HttpResponse.json({
      accessToken: "mock_access_token",
    })
  }),

  // Категории
  http.get("*/categories", ({ request }) => {
    if (shouldReturn401) {
      shouldReturn401 = false
      return HttpResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!requireAuth(request)) {
      return HttpResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const filteredCategories = categoriesMock.map(cat => ({
      ...cat,
      subcategories: cat.subcategories.map(sub => ({ ...sub })),
    }))

    return HttpResponse.json(filteredCategories)
  }),

  // Атрибуты категории
  http.get("*/categories/attributes/:categoryId", ({ request }) => {
    if (!requireAuth(request)) {
      return HttpResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    return HttpResponse.json(categoryAttributesMock)
  }),

  // Продукты по категории с пагинацией
  http.get("*/products/category/:categoryId", ({ params, request }) => {
    if (!requireAuth(request)) {
      return HttpResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

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
  http.get("*/products/:variantId", ({ request }) => {
    if (!requireAuth(request)) {
      return HttpResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    return HttpResponse.json(productByIdMock)
  }),

  // Поиск
  http.get("*/search", ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get("q") || ""

    const result = searchProductsMock[query] || {
      query,
      products: [],
      total: 0,
      categoryId: 0,
      appliedFilters: [],
    }

    return HttpResponse.json(result)
  }),

// Получение списка городов
http.get("*/cities", ({ request }) => {
  if (!requireAuth(request)) {
    return HttpResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    )
  }

  return HttpResponse.json(citiesMock)
}),

// Bootstrap авторизации
http.get("*/bootstrap", () => {
  const isAuthenticated = true

  return HttpResponse.json({
    accessToken: isAuthenticated ? "mock_access_token" : null,
    isAuthenticated,
    user: isAuthenticated
      ? {
          id: 1,
          email: "mock@example.com",
          name: "Mock User",
        }
      : null,
    geolocation: "Moscow",
  })
})
]
