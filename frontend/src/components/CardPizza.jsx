import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { currency } from "../utils/currency";

const CardPizza = ({ pizza }) => {
  const { addItem } = useCart();

  const id = pizza?.id ?? pizza?._id ?? pizza?.slug;

  return (
    <div className="card h-100">
      <img src={pizza.img} className="card-img-top" alt={pizza.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{pizza.name}</h5>
        {Array.isArray(pizza.ingredients) && (
          <p className="card-text text-muted">{pizza.ingredients.join(", ")}</p>
        )}

        <p className="mt-auto fs-5 fw-semibold">{currency(pizza.price)}</p>

        <div className="d-flex gap-2">
          <Link to={`/pizza/${id}`} className="btn btn-outline-secondary w-50">
            Ver más
          </Link>
          <button
            className="btn btn-primary w-50"
            onClick={() =>
              addItem({
                id,
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
  );
};

export default CardPizza;
