export interface Category {
  id: number
  name: string
  subcategories: Category[]
}
export type GenderString = "male" | "female" | "unisex"

export type Product = {
  product_id: number
  product_name: string
  product_description: string
  product_categoryId: number
  variant_id: number
  variant_images?: string
  variant_price: string
  variant_sku: string
  variant_stock: string
  sizes?: string
}

export type FilterItem = {
  attributeId: string
  valueId: string
}

export interface AttributeApi {
  attributeId: number
  attributeName: string
  values: AttributeValue[]
}

export interface AttributeValue {
  id: number
  value: string
}

export type SortOption = {
  label: string
  sort: string
  order: "asc" | "desc"
}
