import { Link } from "react-router-dom"
import { Button } from "../../button/Button"

export function CatalogButton() {
  return (
    <Link to="/catalog">
      <Button>Каталог</Button>
    </Link>
  )
}
