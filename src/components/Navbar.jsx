const Navbar = () => {
  const total = 25000;
  const token = false;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          🍕 Mamma Mía
        </a>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-light">🍕 Home</button>
          <button className="btn btn-outline-light">
            🛒 Total: ${total.toLocaleString("es-CL")}
          </button>

          {token ? (
            <>
              <button className="btn btn-outline-light">🔓 Profile</button>
              <button className="btn btn-outline-light">🔒 Logout</button>
            </>
          ) : (
            <>
              <button className="btn btn-outline-light">🔐 Login</button>
              <button className="btn btn-outline-light">🔐 Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
