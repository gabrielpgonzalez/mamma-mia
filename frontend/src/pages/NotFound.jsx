import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center my-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Ups… esa ruta no existe.</p>
      <Link to="/" className="btn btn-dark mt-3">
        Volver al inicio
      </Link>
    </div>
  );
};
export default NotFound;
