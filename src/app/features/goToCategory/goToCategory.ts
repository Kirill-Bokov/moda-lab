import type { NavigateFunction } from "react-router-dom"

export function goToCategory(
  navigate: NavigateFunction,
  categoryId: number,
  subcategoryId?: number
) {
  const path = subcategoryId
    ? `/category/${categoryId}/${subcategoryId}`
    : `/category/${categoryId}`
  navigate(path)
}
