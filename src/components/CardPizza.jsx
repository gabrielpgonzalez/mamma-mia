import React from "react";
import { Card, Button } from "react-bootstrap";

const CardPizza = ({ name, price, ingredients, img }) => {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <strong>Ingredientes:</strong> {ingredients.join(", ")}
        </Card.Text>
        <Card.Text>
          <strong>Precio:</strong> ${price.toLocaleString()}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="primary">Ver Más</Button>
          <Button variant="success">Añadir</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardPizza;
