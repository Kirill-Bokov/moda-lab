import type { Product } from "./catalogTypes"
import type { FilterItem } from "./catalogTypes"

export interface SearchResponse {
  query: string
  products: Product[]
  total: number
  categoryId: number
  appliedFilters?: FilterItem[]
}