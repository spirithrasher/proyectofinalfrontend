import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; // Importamos el hook

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Usamos el contexto para acceder a la función

  return (
    <Card className="h-100 text-center">
      <Card.Img variant="top" src={product.image} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price.toFixed(2)}</Card.Text>
        <Button variant="primary" className="mt-auto" onClick={() => addToCart(product)}>
          Añadir al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
