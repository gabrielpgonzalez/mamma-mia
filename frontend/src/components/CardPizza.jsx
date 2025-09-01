import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { currency } from "../utils/currency";

const CardPizza = ({ id, name, img, price, ingredients }) => {
  const { addItem } = useCart();

  return (
    <div className="card h-100">
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{ingredients?.join(", ")}</p>
        <p className="mt-auto fw-bold">{currency(price)}</p>
        <div className="d-flex gap-2">
          <Link to={`/pizza/${id}`} className="btn btn-outline-secondary w-50">
            Ver más
          </Link>
          <button
            className="btn btn-primary w-50"
            onClick={() => addItem({ id, name, img, price })}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
