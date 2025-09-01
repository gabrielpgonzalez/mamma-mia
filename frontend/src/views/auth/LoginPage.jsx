import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserProvider, useUser } from "../../context/UserContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login();
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-3 text-center">Iniciar sesión</h3>
              <form onSubmit={handleSubmit} className="d-grid gap-3">
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  🔐 Entrar
                </button>
              </form>
              <p className="mt-3 mb-0 text-center text-muted">
                ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
