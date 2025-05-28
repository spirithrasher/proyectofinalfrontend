import React, { useState } from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; // Importamos el hook

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Usamos el contexto para acceder a la función
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // Ocultar después de 2 segundos
  };

  return (
     <>
      <Card className="h-100 text-center">
        <Card.Img variant="top" src={product.image} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
          <Button variant="primary" className="mt-auto"  onClick={handleAddToCart}>
            Añadir al carrito
          </Button>
        </Card.Body>
      </Card>

      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="success">
          <Toast.Body className="text-white">Producto añadido al carrito ✅</Toast.Body>
        </Toast>
      </ToastContainer>
     </>
  );
};

export default ProductCard;
