import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

interface PaginationProps {
  totalPages: number
}

interface PageItem {
  value: number
  isActive: boolean
}

export function Pagination({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const raw = Number(searchParams.get("page"))
  const currentPage =
    Number.isFinite(raw) && raw >= 1 ? raw : 1


  const protectPage = (page: number) => {
    if (page < 1) return 1
    if (page > totalPages) return totalPages
    return page
  }

  const setPage = (page: number) => {
    const nextPage = protectPage(page)

    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.set("page", String(nextPage))
      return next
    })
  }

  const pages: PageItem[] = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => {
      const value = index + 1
      return {
        value,
        isActive: value === currentPage,
      }
    })
  }, [totalPages, currentPage])
  
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex justify-center gap-2 mt-6">
      {pages.map(page => (
        <button
          key={page.value}
          onClick={() => setPage(page.value)}
          disabled={page.isActive}
          className={`
            w-10 h-10 rounded-full
            flex items-center justify-center
            text-sm font-medium
            transition-colors
            ${
              page.isActive
                ? "bg-teal-600 text-white cursor-default"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }
          `}
        >
          {page.value}
        </button>
      ))}
    </div>
  )
}
