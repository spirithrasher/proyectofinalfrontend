import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; // Importamos el hook

const CartModal = ({ show, onHide }) => {
  const { cartItems, removeFromCart } = useCart(); // Usamos el contexto

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Carrito de compras</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <ListGroup>
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between">
                  {item.name}
                  <span>${item.price.toFixed(2)}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="ms-3"
                  >
                    Eliminar
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="mt-3 text-end">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="success" disabled={cartItems.length === 0}>
          Pagar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
