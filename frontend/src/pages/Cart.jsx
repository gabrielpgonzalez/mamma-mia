import { useCart } from "../hooks/useCart";
import { currency } from "../utils/currency";
import { useUser } from "../context/UserContext";

const Cart = () => {
  const { items, total, addItem, removeOne, removeAll, clear } = useCart();

  if (!items.length) {
    return (
      <div className="container py-4">
        <h2>Tu carrito</h2>
        <p>No hay productos en el carrito.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Tu carrito</h2>
      <div className="list-group mb-3">
        {items.map((it) => (
          <div
            key={it.id}
            className="list-group-item d-flex align-items-center gap-3"
          >
            <img
              src={it.img}
              alt={it.name}
              style={{
                width: 64,
                height: 64,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <div className="me-auto">
              <div className="fw-semibold">{it.name}</div>
              <div className="text-muted">{currency(it.price)} c/u</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => removeOne(it.id)}
              >
                -
              </button>
              <span className="px-2">{it.qty}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => addItem(it)}
              >
                +
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeAll(it.id)}
              >
                Quitar
              </button>
              <span className="ms-3 fw-bold">
                {currency(it.price * it.qty)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-dark" onClick={clear}>
          Vaciar
        </button>
        <div className="fs-5 fw-bold">Total: {currency(total)}</div>
        <button className="btn btn-success">Pagar</button>
      </div>
    </div>
  );
};

export default Cart;
