export interface Category {
  id: number
  name: string
  subcategories: Category[]
}

export interface Product {
  id: number
  name: string
  price: number
  description: string
  imageUrls: string[]
  count: number
}

export interface Attribute {
  attribName: string
  attribValue: string
}

export interface ProductWithAttributes {
  product: Product
  attributes: Attribute[]
}

export type CategoryCardProps = {
  category: Category
  onSubcategoryClick: (categoryId: number, subcategoryId: number) => void
}
