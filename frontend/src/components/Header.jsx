const Header = () => {
  return (
    <header
      className="text-center text-white position-relative py-5"
      style={{
        marginTop: "calc(var(--navbar-offset, 56px) * -1)",

        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",

        backgroundImage: "url('/img/Header.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "300px",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1 }}
      />
      <div className="position-relative" style={{ zIndex: 2 }}>
        <h1 className="fw-bold">¡Pizzería Mamma Mía!</h1>
        <p className="lead">Tenemos las mejores pizzas que podrás encontrar</p>
      </div>
    </header>
  );
};

export default Header;
