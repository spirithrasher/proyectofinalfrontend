import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Importamos useAuth
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la redirección

const CartModal = ({ show, onHide }) => {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth();  // Obtenemos el usuario del contexto de autenticación
  const navigate = useNavigate();  // Inicializamos el hook de navegación

  // Cálculo del total
  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      navigate('/login'); 
    } else {
      // Aquí iría la lógica para procesar el pago
      console.log('Procesando el pago...');

    }
  };

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
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.name}</strong> <br />
                    <small>Cantidad: {item.quantity}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="ms-3"
                    >
                      Eliminar
                    </Button>
                  </div>
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
        <Button 
          variant="success" 
          disabled={cartItems.length === 0 || !user}  // Deshabilitar si no hay usuario
          onClick={handleCheckout} 
        >
          {cartItems.length === 0 ? 'Agrega productos para pagar' : !user ? 'Inicia sesión para pagar' : 'Pagar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
