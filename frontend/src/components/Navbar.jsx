import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { currency } from "../utils/currency";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const { total, count } = useCart();

  useEffect(() => {
    const nav = document.querySelector(".navbar.fixed-top");
    if (!nav) return;
    const setOffset = () => {
      document.documentElement.style.setProperty(
        "--navbar-offset",
        `${nav.offsetHeight}px`
      );
    };
    setOffset();
    window.addEventListener("resize", setOffset);
    return () => window.removeEventListener("resize", setOffset);
  }, []);

  const token =
    typeof isAuthenticated === "boolean"
      ? isAuthenticated
      : !!localStorage.getItem("token");

  const handleLogout = () => {
    if (onLogout) onLogout();
    else localStorage.removeItem("token");
    window.location.href = "/";
  };

  const linkClass = ({ isActive }) =>
    "btn btn-outline-light" + (isActive ? " active" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">
          🍕 Mamma Mía
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex gap-2">
            <li className="nav-item">
              <NavLink end to="/" className={linkClass}>
                🍕 Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className={linkClass}>
                🔓 Profile
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {token ? (
              <button className="btn btn-outline-light" onClick={handleLogout}>
                🔒 Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className={linkClass}>
                  🔐 Login
                </NavLink>
                <NavLink to="/register" className={linkClass}>
                  🔐 Register
                </NavLink>
              </>
            )}

            <NavLink to="/cart" className={linkClass}>
              🛒 Total: {currency(total)}{" "}
              <span className="badge bg-light text-dark ms-2">{count}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
