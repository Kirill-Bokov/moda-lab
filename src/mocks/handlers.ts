import { http, HttpResponse } from "msw"
import { categoriesMock } from "./data/categories.mock"
import { productByIdMock } from "./data/productById.mock"
import { categoryAttributesMock } from "./data/attributes.mock"
import { searchProductsMock } from "./data/searchProducts.mock"
import { generateProducts } from "./data/productByCategory.mock"
import { citiesMock } from "./data/cities.mock"
import { cartHandlers } from "./data/cart.mock"
import { favoriteHandlers } from "./data/favorites.mock"

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

  const sortBy = url.searchParams.get("sortBy") ?? "rating"
  const order = url.searchParams.get("order") ?? "desc"

  const allItems = generateProducts(categoryId)

  let sorted = [...allItems]

  const getPrice = (p: any) => Number(p.variant_price)

  // -----------------------
  // SORTING LOGIC
  // -----------------------

  if (!sortBy || sortBy === "price") {
    sorted.sort((a, b) => {
      const diff = getPrice(a) - getPrice(b)
      return order === "desc" ? -diff : diff
    })
  }

 if (sortBy === "rating") {
  sorted.sort((a, b) =>
    (b.variant_rating ?? 0) -
    (a.variant_rating ?? 0)
  )
}

  // -----------------------
  // PAGINATION
  // -----------------------

  const start = (page - 1) * limit
  const end = start + limit

  const pagedItems = sorted.slice(start, end)

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
  }),

  // Подключение хендлеров корзины
  ...cartHandlers,
  ...favoriteHandlers
]
