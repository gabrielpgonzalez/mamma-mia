import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// pages
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart((prev) => {
      const f = prev.find((p) => p.id === pizza.id);
      return f
        ? prev.map((p) =>
            p.id === pizza.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...prev, { ...pizza, quantity: 1 }];
    });
  };
  const increase = (id) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  const decrease = (id) =>
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0)
    );

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar cart={cart} />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/cart"
              element={
                <Cart cart={cart} increase={increase} decrease={decrease} />
              }
            />
            <Route path="/pizza/p001" element={<Pizza />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
