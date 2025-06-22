import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import { iniciarPago } from '../utils/cartUtils.js'

const CartModal = ({ show, onHide }) => {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth();  
  const navigate = useNavigate();  

  // Cálculo del total
  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login'); 
    } else {
      try {
        const urlWebpay = await iniciarPago(cartItems, user);
        console.log('webpayurl: ',urlWebpay)
        window.location.href = `${urlWebpay.url}?token_ws=${urlWebpay.token}`; // Redirige al formulario Webpay
      } catch (err) {
        console.error("Error al redirigir al pago:", err.message);
        alert("Hubo un problema al iniciar el pago. Intenta nuevamente.");
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Carrito de compras</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <a className="btn btn-warning  mb-5" href="/tarjetasdeprueba.pdf" target="_blank" rel="noopener noreferrer">
          Tarjetas Para Pagar
        </a>
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
