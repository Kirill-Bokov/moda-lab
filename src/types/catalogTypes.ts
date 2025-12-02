export interface Category {
  id: number
  name: string
  subcategories: Category[]
}

export type Product = {
  product_id: number
  product_name: string
  product_description: string
  product_categoryId: number
  variant_id: string
  variant_images?: string
  variant_price: string
  variant_sku: string
  variant_stock: string
  sizes?: string
}

export interface Attribute {
  attributeId: number
  attributeName?: string
  values: string[]
}
