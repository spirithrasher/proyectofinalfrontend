import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function SubirProducto() {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, imagen: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del producto:', formData);
    // Aquí enviar al backend cuando esté disponible
  };

  return (
    <Container className="mt-5 pt-5">
      <h2 className="mb-4">Subir Producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Ej: Zapatillas deportivas"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            placeholder="Ej: 19990"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            placeholder="Describe tu producto"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formImagen">
          <Form.Label>Imagen del producto</Form.Label>
          <Form.Control
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Subir producto
        </Button>
      </Form>
    </Container>
  );
}
