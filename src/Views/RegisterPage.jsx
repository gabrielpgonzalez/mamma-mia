import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";

const RegisterPage = () => {
  const { setUserData } = useContext(UserContext); // Acceder al contexto
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { email, password, confirmPassword } = registerData;

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      return "Todos los campos son obligatorios.";
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      return "Por favor, ingresa un email válido.";
    }
    if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      setSuccessMessage("");
    } else {
      setErrorMessage("");
      setSuccessMessage("¡Registro exitoso!");
      setUserData({ email, password }); // Guardar datos en el contexto
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
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
        <h2 className="mb-4 text-center">Crea una cuenta</h2>

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

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmar contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
      </form>
    </main>
  );
};

export default RegisterPage;
