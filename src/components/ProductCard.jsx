import React, { useState } from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import VerProductoModal from './VerProductoModal';
import '../utils/css/ProductCard.css'; // <-- Nuevo archivo de estilos

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
      <Card className="product-card h-100 text-white text-center">
        <Card.Img
          variant="top"
          src={`http://localhost:3000${product.imagen}` || 'https://via.placeholder.com/300x200'}
          className="product-image"
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="product-title-bg">{product.name}</Card.Title>
            <Card.Text className="price-text">${product.price}</Card.Text>
          </div>
          <div className="d-flex gap-2 mt-auto">
            <Button className="btn btn-warning btn-outline-custom flex-fill" onClick={() => setShowModal(true)}>
              Ver
            </Button>
            <Button className="btn btn-warning btn-warning-custom flex-fill" onClick={handleAddToCart}>
              Añadir
            </Button>
          </div>
        </Card.Body>



      </Card>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2000}
        autohide
        bg="success"
        style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1050 }}
      >
        <Toast.Body className="text-white">Producto añadido al carrito ✅</Toast.Body>
      </Toast>

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
