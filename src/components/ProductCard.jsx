import React, { useState } from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import VerProductoModal from './VerProductoModal';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    console.log("Producto añadido:", product); 
    addToCart(product);  
    setShowToast(true); 
    setTimeout(() => setShowToast(false), 2000);  
  };

  return (
    <>
      <Card className="h-100 text-center">
        <Card.Img variant="top" src={`http://localhost:3000${product.imagen}` || 'https://via.placeholder.com/300x200'} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
          <div className="mt-auto d-flex justify-content-between">
            <Button variant="info" onClick={() => setShowModal(true)}>
              Ver
            </Button>
            <Button variant="primary" onClick={handleAddToCart}>
              Añadir
            </Button>
          </div>
        </Card.Body>
      </Card>

      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="success">
          <Toast.Body className="text-white">Producto añadido al carrito ✅</Toast.Body>
        </Toast>
      </ToastContainer>

      <VerProductoModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        producto={product}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductCard;
