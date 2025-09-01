// src/pages/Pizza.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { currency } from "../utils/currency";
import { API_BASE } from "../utils/api";

const Pizza = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("ID de pizza no válido.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const url = `${API_BASE}/pizzas/${encodeURIComponent(id)}`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`No se pudo cargar la pizza (id: ${id})`);
        const data = await resp.json();
        setPizza(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="container py-4">Cargando...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;
  if (!pizza) return null;

  const pid = pizza.id ?? pizza._id ?? id;

  return (
    <div className="container py-4">
      <div className="row g-4 align-items-start">
        <div className="col-12 col-md-6">
          <img
            src={pizza.img}
            alt={pizza.name}
            className="img-fluid rounded shadow-sm d-block"
          />
        </div>
        <div className="col-12 col-md-6">
          <h2 className="mb-2">{pizza.name}</h2>
          <p className="text-muted">{pizza.desc}</p>

          {Array.isArray(pizza.ingredients) && (
            <p className="mb-3">
              <strong>Ingredientes:</strong> {pizza.ingredients.join(", ")}
            </p>
          )}

          <div className="d-flex align-items-center gap-3">
            <span className="fs-4 fw-semibold">{currency(pizza.price)}</span>
            <button
              className="btn btn-primary"
              onClick={() =>
                addItem({
                  id: pid,
                  name: pizza.name,
                  img: pizza.img,
                  price: pizza.price,
                })
              }
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
