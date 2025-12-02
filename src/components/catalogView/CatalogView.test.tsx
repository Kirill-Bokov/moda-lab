// src/components/catalogView/CatalogView.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, vi, expect } from "vitest"
import { CatalogView } from "./CatalogView"

// Мок для функции goToCategory
vi.mock("../../app/features/goToCategory/goToCategory", () => ({
  goToCategory: vi.fn(),
}))

// Мок CategoryCard, чтобы не рендерить весь компонент
vi.mock("../categoryCard/CategoryCard", () => ({
  CategoryCard: ({ category, onCategoryClick }: CategoryCardProps) => (
    <div data-testid="category-card" onClick={() => onCategoryClick(category.id)}>
      {category.name}
    </div>
  ),
}))

import { goToCategory } from "../../app/features/goToCategory/goToCategory"
import type { CategoryCardProps } from "../../types/catalogTypes"

describe("CatalogView", () => {
  const categories = [
    { id: 1, name: "Брюки", subcategories: [] },
    { id: 2, name: "Пуховики", subcategories: [] },
  ]

  const navigate = vi.fn()

  it("рендерит все категории", () => {
    render(<CatalogView categories={categories} navigate={navigate} />)
    categories.forEach((c) => {
      expect(screen.getByText(c.name)).toBeInTheDocument()
    })
  })

  it("вызывает goToCategory при клике на категорию", () => {
    render(<CatalogView categories={categories} navigate={navigate} />)
    const firstCard = screen.getByText("Брюки")
    fireEvent.click(firstCard)
    expect(goToCategory).toHaveBeenCalledWith(navigate, 1, undefined)
  })
})
