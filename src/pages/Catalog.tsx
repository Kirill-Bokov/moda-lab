import { useNavigate } from "react-router-dom"
import { useGetCategoriesQuery } from "../app/api/catalogApi"
import { useSelector } from "react-redux"
import type { RootState } from "../app/store"
import { CatalogView } from "../components/catalogView/CatalogView"

export default function Catalog() {
  const gender = useSelector((state: RootState) => state.gender.value)
  const { data: categories, isLoading, error } = useGetCategoriesQuery({ gender })
  const navigate = useNavigate()

  if (isLoading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка загрузки каталога</p>
  if (!categories?.length) return <p>Категории не найдены</p>

  return <CatalogView categories={categories} navigate={navigate} />
}
