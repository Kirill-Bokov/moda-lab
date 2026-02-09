import { useSearchParams } from "react-router-dom"

interface PaginationProps {
  totalPages: number
}

export function Pagination({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page") ?? 1)

  if (totalPages <= 1) {
    return null
  }

  const setPage = (page: number) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.set("page", String(page))
      return next
    })
  }

  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1
        const isActive = page === currentPage

        return (
          <button
            key={page}
            onClick={() => setPage(page)}
            disabled={isActive}
            className={`
              w-10 h-10 rounded-full
              flex items-center justify-center
              text-sm font-medium
              transition-colors
              ${
                isActive
                  ? "bg-teal-600 text-white cursor-default"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }
            `}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}
