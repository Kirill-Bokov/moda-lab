import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"

type ShowAllFiltersButtonProps = {
  expanded: boolean
  setExpanded: (value: boolean | ((prev: boolean) => boolean)) => void
}

export function ShowAllFiltersButton({ setExpanded }: ShowAllFiltersButtonProps) {
  return (
    <button
      type="button"
      onClick={() => setExpanded(p => !p)}
      className="ml-auto flex items-center gap-1 rounded-lg px-2 py-1 transition-colors hover:bg-gray-300"
    >
      <AdjustmentsHorizontalIcon className="h-4 w-4" />
      Все фильтры
    </button>
  )
}
