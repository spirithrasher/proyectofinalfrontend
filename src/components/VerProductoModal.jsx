import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

export default function VerProductoModal({ show, handleClose, producto, onAddToCart }) {
  if (!producto) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{producto.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image
          src={producto.image || 'https://via.placeholder.com/300x200'}
          alt={producto.name}
          fluid
          className="mb-3"
        />
        <p><strong>Categoría:</strong> {producto.categoria_id || 'Sin categoría'}</p>
        <p><strong>Descripción:</strong> {producto.descripcion || 'Sin descripción'}</p>
        <p><strong>Precio:</strong> ${producto.price}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={() => onAddToCart(producto)}>
          Agregar al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
