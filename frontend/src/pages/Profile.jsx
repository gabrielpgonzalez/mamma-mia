import { useUser } from "../context/UserContext.jsx";

const Profile = () => {
  const { email, logout } = useUser();

  return (
    <div className="container py-4">
      <h2 className="mb-3">Perfil</h2>
      <p className="mb-4">
        <strong>Email:</strong> {email || "(sin email)"}
      </p>
      <button className="btn btn-outline-dark" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
