import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import '../utils/css/verproductos.css'; // <-- Archivo de estilos
import { API_URL } from '../utils/apiConfig';

export default function VerProductoModal({ show, handleClose, producto, onAddToCart }) {
  if (!producto) return null;

  const categoriaNombre = producto.categoria_nombre || producto.categoria_id || 'Sin categoría';

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="modal-header-black" style={{ backgroundColor: '#000', color: '#ffc107' }}>
        <Modal.Title style={{ fontWeight: '700' }}>{producto.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: '#212529' }}>
        <Image
          src={`${API_URL}${producto.imagen}` || 'https://via.placeholder.com/300x200'}
          alt={producto.name}
          fluid
          className="mb-3 rounded"
        />
        <p><strong>Categoría:</strong> {categoriaNombre}</p>
        <p><strong>Descripción:</strong> {producto.description|| 'Sin descripción'}</p>
        <p className="fw-bold" style={{ color: '#ffc107', fontSize: '1.25rem' }}>
          Precio: ${producto.price}
        </p>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#f8f9fa' }}>
        <Button variant="outline-danger" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="warning" onClick={() => onAddToCart(producto)}>
          Agregar al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
