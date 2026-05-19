import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Category from "./pages/Category"
import Product from "./pages/Product"
import SearchPage from "./pages/SearchPage"
import LoginPage from "./pages/LoginPage"
import CartPage from "./pages/CartPage"
import FavoritePage from "./pages/FavoritePage"

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/category/:categoryId/:subcategoryId" element={<Category />} />
      <Route path="/category/:categoryId" element={<Category />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:variantId" element={<Product />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorites" element={<FavoritePage />} />
    </Routes>
  )
}
