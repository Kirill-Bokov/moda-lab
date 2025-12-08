export interface Attribute {
  id: number
  name: string
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

export interface ProductVariant {
  id: number
  sku: string
  price: string
  stock: number
  images: string[]
  attributeValues: VariantAttributeValue[]
}

export interface ProductCategory {
  id: number
  name: string
  gender: string
}

export interface Product {
  id: number
  name: string
  description: string
  category: ProductCategory
  variants: ProductVariant[]
}
