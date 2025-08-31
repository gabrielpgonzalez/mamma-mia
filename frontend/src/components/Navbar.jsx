const Navbar = ({ onNavigate = () => {}, cart = [] }) => {
  const token = false;
  const total = cart.reduce((acc, p) => acc + p.price * (p.quantity || 0), 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("home");
          }}
        >
          🍕 Mamma Mía
        </a>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-light"
            onClick={() => onNavigate("home")}
          >
            🍕 Home
          </button>
          <button
            className="btn btn-outline-light"
            onClick={() => onNavigate("cart")}
          >
            🛒 Total: ${total.toLocaleString("es-CL")}
          </button>

          {token ? (
            <>
              <button className="btn btn-outline-light">🔓 Profile</button>
              <button className="btn btn-outline-light">🔒 Logout</button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-light"
                onClick={() => onNavigate("login")}
              >
                🔐 Login
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => onNavigate("register")}
              >
                🔐 Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
