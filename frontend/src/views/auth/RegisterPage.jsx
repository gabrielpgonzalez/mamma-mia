import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const { register, loading, error } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const res = await register({ email, password: pass, name });
    if (res?.ok) navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-3 text-center">Crear cuenta</h3>

              <form onSubmit={handleSubmit} className="d-grid gap-3">
                <div>
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

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

                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={loading}
                >
                  {loading ? "Creando..." : "✨ Registrarme"}
                </button>
              </form>

              {error && (
                <div className="alert alert-danger mt-3 mb-0">{error}</div>
              )}

              <p className="mt-3 mb-0 text-center text-muted">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
