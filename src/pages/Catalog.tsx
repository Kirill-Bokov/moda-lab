import { useNavigate } from "react-router-dom"
import { useGetCategoriesQuery } from "../app/api/catalogApi"
import { useSelector } from "react-redux"
import { CatalogView } from "../components/catalogView/CatalogView"
import { selectGender } from "../app/selectors/genderSelectors"

export default function Catalog() {
  const gender = useSelector(selectGender)
  const { data: categories, isLoading, error } = useGetCategoriesQuery({ gender })
  const navigate = useNavigate()

  if (isLoading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка загрузки каталога</p>
  if (!categories?.length) return <p>Категории не найдены</p>

  return <CatalogView categories={categories} navigate={navigate} />
}
