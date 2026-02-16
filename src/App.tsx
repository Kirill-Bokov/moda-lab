import { useEffect } from "react"
import Header from "./components/header/Header"
import AppRouter from "./AppRouter"
import { useLazyRefreshTokenQuery } from "./app/api/catalogApi"

export default function App() {
  const [triggerRefresh] = useLazyRefreshTokenQuery()

  useEffect(() => {
    triggerRefresh().unwrap().catch(() => {
      console.log("Silent refresh failed")
    })
  }, [triggerRefresh])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <AppRouter />
      </main>
    </div>
  )
}
