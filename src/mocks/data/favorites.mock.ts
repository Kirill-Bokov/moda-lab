import { http, HttpResponse } from "msw"
import type { CartItemDto, AddCartItemDto } from "../../types/cartTypes"

export type FavoriteItemDto = Omit<CartItemDto, "quantity">
export type AddFavoriteItemDto = Omit<AddCartItemDto, "quantity">

let favoriteItems: FavoriteItemDto[] = [
  { id: 1, variantId: 57, sizeId: 170},
  { id: 2, variantId: 58, sizeId: 170}
]

let nextFavoriteId = 3

export const favoriteHandlers = [
  // Получение избранного
  http.get("*/favorite", () => {
    return HttpResponse.json(favoriteItems)
  }),

  // Добавление товара в избранное
  http.post("*/favorite", async ({ request }) => {
    const body = (await request.json()) as AddFavoriteItemDto

    if (!body.variantId) {
      return HttpResponse.json(
        { message: "Invalid payload" },
        { status: 400 }
      )
    }

    const existing = favoriteItems.find(
      item =>
        item.variantId === body.variantId &&
        item.sizeId === (body.sizeId ?? undefined)
    )

    if (existing) {
      return HttpResponse.json(existing, { status: 200 })
    }

    const newItem: FavoriteItemDto = {
      id: nextFavoriteId++,
      variantId: body.variantId,
      sizeId: body.sizeId
    }

    favoriteItems.push(newItem)

    return HttpResponse.json(newItem, { status: 201 })
  }),

  // Удаление из избранного
  http.delete("*/favorite/:id", ({ params }) => {
    const id = Number(params.id)

    const exists = favoriteItems.some(i => i.id === id)

    if (!exists) {
      return HttpResponse.json(
        { message: "Not found" },
        { status: 404 }
      )
    }

    favoriteItems = favoriteItems.filter(i => i.id !== id)

    return HttpResponse.json(null, { status: 204 })
  })
]
