// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const ProfilePage = () => (
  <div className="container py-5">
    <h2>Perfil</h2>
    <p className="text-muted">Contenido de tu perfil (pendiente).</p>
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/cart" element={<Cart />} />

          {/* nuevas rutas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="*"
            element={
              <div className="container py-5">
                <h2 className="mb-2">404 — Página no encontrada</h2>
                <p className="text-muted">La ruta que ingresaste no existe.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
