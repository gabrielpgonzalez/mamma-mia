const Cart = ({ cart, increase, decrease }) => {
  const total = cart.reduce((acc, p) => acc + p.price * (p.quantity || 0), 0);

  return (
    <div className="container my-5">
      <h2 className="mb-4">🛒 Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>No hay pizzas en el carrito</p>
      ) : (
        <div className="list-group">
          {cart.map((pizza) => (
            <div
              key={pizza.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center gap-3">
                <img src={pizza.img} alt={pizza.name} width="80" />
                <div>
                  <h5>{pizza.name}</h5>
                  <p>${pizza.price.toLocaleString("es-CL")}</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => decrease(pizza.id)}
                >
                  -
                </button>
                <span>{pizza.quantity}</span>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => increase(pizza.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 text-end">
        <h4>Total: ${total.toLocaleString("es-CL")}</h4>
        <button className="btn btn-success mt-2">Pagar</button>
      </div>
    </div>
  );
};
export default Cart;
