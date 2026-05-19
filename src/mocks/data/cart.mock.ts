import { http, HttpResponse } from "msw"
import type {
  CartItemDto,
  AddCartItemDto,
  UpdateCartItemDto
} from "../../types/cartTypes"

let cartItems: CartItemDto[] = [
  { id: 1, variantId: 57, sizeId: 170, quantity: 2 },
  { id: 2, variantId: 58, sizeId: 170, quantity: 1 }
]

let nextId = 3

export const cartHandlers = [
  // Получение корзины
  http.get("*/cart", () => {
    return HttpResponse.json(cartItems)
  }),

  // Добавление товара
  http.post("*/cart", async ({ request }) => {
    const body = (await request.json()) as AddCartItemDto

    if (!body.variantId || !body.sizeId || !body.quantity || body.quantity <= 0) {
      return HttpResponse.json(
        { message: "Invalid payload" },
        { status: 400 }
      )
    }

    const existing = cartItems.find(
      item =>
        item.variantId === body.variantId &&
        item.sizeId === body.sizeId
    )

    if (existing) {
      existing.quantity += body.quantity
      return HttpResponse.json(existing, { status: 200 })
    }

    const newItem: CartItemDto = {
      id: nextId++,
      variantId: body.variantId,
      sizeId: body.sizeId,
      quantity: body.quantity
    }

    cartItems.push(newItem)

    return HttpResponse.json(newItem, { status: 201 })
  }),

  // Обновление количества
  http.patch("*/cart/:id", async ({ request, params }) => {
    const id = Number(params.id)
    const body = (await request.json()) as UpdateCartItemDto

    const itemIndex = cartItems.findIndex(i => i.id === id)

    if (itemIndex === -1) {
      return HttpResponse.json(
        { message: "Not found" },
        { status: 404 }
      )
    }

    if (!body.quantity || body.quantity <= 0) {
      cartItems = cartItems.filter(i => i.id !== id)
      return HttpResponse.json(null, { status: 204 })
    }

    cartItems[itemIndex].quantity = body.quantity

    return HttpResponse.json(cartItems[itemIndex], { status: 200 })
  }),

  // Удаление
  http.delete("*/cart/:id", ({ params }) => {
    const id = Number(params.id)

    const exists = cartItems.some(i => i.id === id)

    if (!exists) {
      return HttpResponse.json(
        { message: "Not found" },
        { status: 404 }
      )
    }

    cartItems = cartItems.filter(i => i.id !== id)

    return HttpResponse.json(null, { status: 204 })
  })
]
