import { http, HttpResponse } from "msw"
import { categoriesMock } from "./data/categories.mock"
import { productByIdMock } from "./data/productById.mock"
import { productByCategoryMock } from "./data/productByCategory.mock"
import { categoryAttributesMock } from "./data/attributes.mock"

let shouldReturn401 = true

const requireAuth = (request: Request) => {
  const authHeader = request.headers.get("authorization")
  return authHeader === "Bearer mock_access_token"
}

export const handlers = [
  http.get("*/auth/refresh", () => {
    return HttpResponse.json({
      accessToken: "mock_access_token",
    })
  }),

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

    if (categoryId === 4) {
      const allShirts = Object.values(productByCategoryMock).flat()
      return HttpResponse.json(allShirts)
    }

    const data = productByCategoryMock[categoryId]
    return HttpResponse.json(data)
  }),

  http.get("*/products/:variantId", ({ request }) => {
    if (!requireAuth(request)) {
      return HttpResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    return HttpResponse.json(productByIdMock)
  }),
]
