const Profile = () => {
  const email = "usuario@demo.com";
  return (
    <div className="container my-5">
      <h2 className="mb-3">Perfil</h2>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <button className="btn btn-outline-dark">Cerrar sesión</button>
    </div>
  );
};
export default Profile;
