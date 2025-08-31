import { useState } from "react";

const RegisterPage = ({ setView, setRegisteredUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      window.alert("❌ Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      window.alert("❌ La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      window.alert("❌ Las contraseñas no coinciden");
      return;
    }

    // Guardar usuario registrado
    setRegisteredUser({ email, password });
    window.alert("✅ Registro exitoso, ahora puedes iniciar sesión");

    // Ir a la vista de Login
    setView("login");
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Registro</h2>
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
        <div className="mb-3">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-dark w-100">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
