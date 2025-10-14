export default function HeaderSearch() {
  return (
    <div className="flex justify-start">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Поиск товаров..."
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 pl-10 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
