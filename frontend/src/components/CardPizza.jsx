// src/components/CardPizza.jsx
import { Link } from "react-router-dom";

const CardPizza = ({ name, price, ingredients = [], img, onAdd }) => {
  return (
    <div className="card shadow-sm" style={{ width: "18rem" }}>
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p>
          <strong>Ingredientes:</strong>
        </p>
        <ul>
          {ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
        <p className="fw-bold">Precio: ${price?.toLocaleString("es-CL")}</p>
        <div className="d-flex justify-content-between">
          {/* Botón Ver más que lleva a /pizza/p001 */}
          <Link to="/pizza/p001" className="btn btn-outline-primary">
            Ver más 👀
          </Link>
          <button className="btn btn-dark" onClick={onAdd}>
            Añadir 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
