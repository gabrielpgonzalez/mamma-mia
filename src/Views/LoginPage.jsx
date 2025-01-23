import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";

const LoginPage = () => {
  const { userData } = useContext(UserContext); // Acceder a los datos del contexto
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { email, password } = loginData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Todos los campos son obligatorios.");
      setSuccessMessage("");
      return;
    }
    if (
      !userData ||
      email !== userData.email ||
      password !== userData.password
    ) {
      setErrorMessage("Usuario y/o contraseña incorrectos.");
      setSuccessMessage("");
    } else {
      setErrorMessage("");
      setSuccessMessage("¡Acceso exitoso!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="p-4 border rounded shadow"
        style={{ width: "100%", maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-center">Inicia sesión</h2>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
