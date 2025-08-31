import { Link, NavLink } from "react-router-dom";

const Navbar = ({ cart = [] }) => {
  const token = false;
  const total = Array.isArray(cart)
    ? cart.reduce((acc, p) => acc + (p.price || 0) * (p.quantity || 0), 0)
    : 0;

  const linkClass = ({ isActive }) =>
    "btn btn-outline-light" + (isActive ? " active" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        {/* Logo -> Home */}
        <Link className="navbar-brand" to="/">
          🍕 Mamma Mía
        </Link>

        <div className="d-flex gap-2">
          <NavLink className={linkClass} to="/">
            🍕 Home
          </NavLink>
          <NavLink className={linkClass} to="/profile">
            🔓 Profile
          </NavLink>

          {token ? (
            <button className="btn btn-outline-light">🔒 Logout</button>
          ) : (
            <>
              <NavLink className={linkClass} to="/login">
                🔐 Login
              </NavLink>
              <NavLink className={linkClass} to="/register">
                🔐 Register
              </NavLink>
            </>
          )}

          <NavLink className={linkClass} to="/cart">
            🛒 Total: ${total.toLocaleString("es-CL")}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
