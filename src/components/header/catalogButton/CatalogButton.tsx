import { Link } from "react-router-dom";
import { Button } from "../../button/Button";

export function CatalogButton() {
  return (
    <Link to="/catalog">
      <Button className="cursor-pointer">Каталог</Button>
    </Link>
  );
}
