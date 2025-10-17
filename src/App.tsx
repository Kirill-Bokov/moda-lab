import Header from "./components/header/Header"
import AppRouter from "./AppRouter"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <AppRouter />
      </main>
    </div>
  )
}
