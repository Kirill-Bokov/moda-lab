import Header from "./components/header/Header"
import AppRouter from "./AppRouter"

import { useGetBootstrapQuery } from "./app/api/systemApi"
import { Footer } from "./components/footer/Footer"

export default function App() {
  const { isLoading } = useGetBootstrapQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <AppRouter />
      </main>
      <Footer />
    </div>
  )
}
