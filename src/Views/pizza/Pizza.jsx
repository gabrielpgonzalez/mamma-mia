import { useEffect, useState } from "react";
import { Button, Container, Image, Row } from "react-bootstrap";
import Header from "../../components/Header";
import IngredientList from "../../components/ingredientlist/IngredientList";
import { fetchData } from "../../utils/fetch";
import { currency } from "../../utils/format";

const Pizza = () => {
  const [pizza, setPizza] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetchData({
      data: { endpoint: "http://localhost:5001/api/pizzas/p001" },
      callback: setPizza,
      errorCallback: setError,
    });
  }, [setPizza, setError]);

  const { name, price, desc, ingredients, img } = pizza;

  return (
    <main>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <Header />
          <Container className="p-3 p-md-4 py-md-5">
            <Row>
              <Image
                src={img}
                alt={`Imagen de pizza ${name}`}
                className="col-12 col-md-6 order-md-last mb-4"
              />
              <Row className="col-12 col-md-6 mb-md-5 pb-md-5">
                <h2 className="text-capitalize">Pizza {name}</h2>
                <p className="fs-5 mt-3">
                  <span className="fw-light text-secondary">💵 Precio:</span>{" "}
                  {currency(price)}
                </p>
                <IngredientList ingredients={ingredients} />
                <p className="fs-5 fw-light text-secondary mt-3 mb-0">
                  📝 Descripción:
                </p>
                <p>{desc}</p>
                <Button
                  variant="dark"
                  className="col-5 col-md-3 mx-auto mt-2 mb-3"
                >
                  Añadir 🛒
                </Button>
              </Row>
            </Row>
          </Container>
        </>
      )}
    </main>
  );
};

export default Pizza;
