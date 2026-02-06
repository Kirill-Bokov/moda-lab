import { LinkIcon } from "@heroicons/react/24/outline"
import { ProductSku } from "./productSku"

type Props = {
  sku: string
}

export function ProductShare({ sku }: Props) {
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className="mt-6">
      <h2 className="font-medium mb-3 flex items-center gap-2">
        Артикул <ProductSku sku={sku} />
      </h2>

      <div className="flex gap-3">
        <button
          className="w-14 h-14 flex items-center justify-center rounded border border-gray-300 text-sm font-medium hover:border-blue-600 transition"
          title="Поделиться ВКонтакте"
        >
          VK
        </button>

        <button
          className="w-14 h-14 flex items-center justify-center rounded border border-gray-300 text-sm font-medium hover:border-sky-500 transition"
          title="Поделиться в Telegram"
        >
          TG
        </button>

        <button
          onClick={handleCopyLink}
          className="w-14 h-14 flex items-center justify-center rounded border border-gray-300 hover:border-teal-600 transition"
          title="Скопировать ссылку"
        >
          <LinkIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
