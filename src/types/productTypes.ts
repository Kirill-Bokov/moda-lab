export interface Attribute {
  id: number
  name: string
  values?: { id: number; value: string }[]
}

export interface AttributeValue {
  id: number
  value: string
  attribute: Attribute
}

export interface VariantAttributeValue {
  id: number
  value: AttributeValue
}

export interface ProductSize {
  id: number
  size: string
  stock: number
}

export interface ProductImage {
  id: number
  url: string
}

export interface ProductVariant {
  variant_id: number
  sku: string
  price: string
  images: ProductImage[]
  sizes: ProductSize[]
  attributeValues: VariantAttributeValue[]
}

export interface ProductCategory {
  id: number
  name: string
  gender: string
}

export interface ProductCard {
  id: number
  name: string
  description: string
  category: ProductCategory
  variants: ProductVariant[]
}
