import { useEffect, useState } from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";

const API_URL = "http://localhost:5001/api/pizzas";

const Home = ({ addToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPizzas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  if (loading) return <p className="text-center my-5">Cargando pizzas...</p>;
  if (error)
    return <p className="text-center my-5 text-danger">Error: {error}</p>;

  return (
    <div>
      <Header />
      <div className="container my-5 d-flex gap-4 flex-wrap justify-content-center">
        {pizzas.map((pz) => (
          <CardPizza
            key={pz.id}
            name={pz.name}
            price={pz.price}
            ingredients={pz.ingredients}
            img={pz.img}
            onAdd={() => addToCart(pz)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
