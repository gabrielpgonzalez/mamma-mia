import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import Cart from "./components/Cart";

function App() {
  const [view, setView] = useState("home");
  const [registeredUser, setRegisteredUser] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === pizza.id);
      if (found) {
        return prev.map((p) =>
          p.id === pizza.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...pizza, quantity: 1 }];
    });
  };

  const increase = (id) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onNavigate={setView} cart={cart} />
      <main className="flex-grow-1">
        {view === "home" && <Home addToCart={addToCart} />}
        {view === "register" && (
          <RegisterPage
            setView={setView}
            setRegisteredUser={setRegisteredUser}
          />
        )}
        {view === "login" && <LoginPage registeredUser={registeredUser} />}
        {view === "cart" && (
          <Cart cart={cart} increase={increase} decrease={decrease} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
