// src/pages/Pizza.jsx
import { useEffect, useState } from "react";

const API_DETAIL = "http://localhost:5001/api/pizzas/p001"; // o "/api/..." si usas proxy

const Pizza = ({ addToCart }) => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API_DETAIL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPizza(data); // <- objeto pizza completo (id, name, price, img, etc.)
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-center my-5">Cargando pizza...</p>;
  if (error)
    return <p className="text-center my-5 text-danger">Error: {error}</p>;
  if (!pizza) return null;

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img src={pizza.img} alt={pizza.name} className="img-fluid rounded" />
        </div>
        <div className="col-12 col-md-6">
          <h2 className="mb-3">{pizza.name}</h2>
          <p className="text-muted">{pizza.desc /* o pizza.description */}</p>
          <h4 className="mt-3">Ingredientes</h4>
          <ul>
            {pizza.ingredients?.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
          <h3 className="mt-3">
            Precio: ${pizza.price?.toLocaleString("es-CL")}
          </h3>

          {/* 🔽 aquí sumamos al carrito global usando el objeto pizza */}
          <button
            className="btn btn-dark mt-3"
            onClick={() => addToCart(pizza)}
          >
            Añadir 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
