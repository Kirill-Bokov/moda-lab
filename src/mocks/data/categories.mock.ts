import type { Category } from "../../types/catalogTypes"

export const categoriesMock: Category[] = [
  {
    id: 4,
    name: "Рубашки",
    subcategories: [
      { id: 401, name: "Рубашки", subcategories: [] },
      { id: 402, name: "Классические сорочки", subcategories: [] },
      { id: 403, name: "Рубашки с коротким рукавом", subcategories: [] },
      { id: 404, name: "Поло", subcategories: [] },
      { id: 405, name: "Гавайские", subcategories: [] },
    ],
  },
]
