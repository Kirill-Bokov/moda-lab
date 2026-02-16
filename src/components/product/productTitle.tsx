import { ProductSku } from "../product/productSku"

type Props = {
  name: string
  price: string
  sku: string
}

export function ProductTitle({ name, price, sku }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">{name}</h1>
        <ProductSku sku={sku} />
      </div>

      <p className="text-lg font-medium">{price} ₽</p>
    </div>
  )
}
