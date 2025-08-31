import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
import { pizzas } from "../data/pizzas";

const Home = ({ addToCart }) => {
  return (
    <div>
      <Header />
      <div className="container my-5 d-flex gap-4 flex-wrap justify-content-center">
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            img={pizza.img}
            onAdd={() => addToCart(pizza)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
