import { useState } from "react"

type Props = {
  sku: string
}

export function ProductSku({ sku }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sku)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch {
      console.error("Не удалось скопировать артикул")
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`text-sm border rounded px-2 py-0.5 transition ${
        copied
          ? "border-teal-600 text-teal-700"
          : "border-gray-300 text-gray-500 hover:text-gray-800"
      }`}
    >
      {copied ? "Скопировано" : sku}
    </button>
  )
}
