/* import React from "react";
import Header from "./Header";
import CardPizza from "./CardPizza";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const pizzas = [
    {
      name: "Napolitana",
      price: 5950,
      ingredients: ["mozzarella", "tomates", "jamón", "orégano"],
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_cl.jpg?alt=media&token=6a9a33da-5c00-49d4-9080-784dcc87ec2c",
    },
    {
      name: "Española",
      price: 6950,
      ingredients: ["mozzarella", "gorgonzola", "parmesano", "provolone"],
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab",
    },
    {
      name: "Pepperoni",
      price: 6950,
      ingredients: ["mozzarella", "pepperoni", "orégano"],
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_com.jpg?alt=media&token=e7cde87a-08d5-4040-ac54-90f6c31eb3e3",
    },
  ];

  return (
    <>
      <Header />
      <Container fluid className="mt-4">
        <Row>
          {pizzas.map((pizza, index) => (
            <Col md={4} key={index}>
              <CardPizza {...pizza} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
 */

import React, { useEffect, useState } from "react";
import Header from "./Header";
import CardPizza from "./CardPizza";
import { Container, Row, Col } from "react-bootstrap";
import { fetchData } from "../utils/fetch";
import Error from "../components/error/Error";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData({
      data: { endpoint: "http://localhost:5001/api/pizzas" },
      callback: setPizzas,
      errorCallback: setError,
    });
  }, []);

  return (
    <>
      <Header />
      <Container fluid className="mt-4">
        {error ? (
          <Error error={error} />
        ) : (
          <Row>
            {pizzas.map((pizza, index) => (
              <Col md={4} key={index}>
                <CardPizza {...pizza} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Home;
