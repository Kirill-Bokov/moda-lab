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

export type CategoryCardProps = {
  category: Category
  onCategoryClick: (categoryId: number, subcategoryId?: number) => void
}
