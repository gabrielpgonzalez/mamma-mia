import { useState } from "react";

const LoginPage = ({ registeredUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      window.alert("❌ Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      window.alert("❌ La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (
      registeredUser &&
      email === registeredUser.email &&
      password === registeredUser.password
    ) {
      window.alert("✅ Inicio de sesión exitoso");
    } else {
      window.alert("❌ Credenciales incorrectas");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-dark w-100">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
