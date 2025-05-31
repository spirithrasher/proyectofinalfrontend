import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

export default function Perfil() {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    direccion: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del perfil:', formData);

    // Cuando quieras enviar al backend, descomenta esta línea:
    // await guardarPerfilEnBackend(formData);
  };

  // Función preparada para enviar los datos al backend
  const guardarPerfilEnBackend = async (datos) => {
    try {
      const res = await fetch('http://localhost:3000/api/perfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al guardar perfil');
      }

      console.log('Perfil guardado en backend:', data);
    } catch (error) {
      console.error('Error al enviar al backend:', error.message);
    }
  };

  return (
    <Container className="mt-5 pt-5">
      <h2 className="mb-4">Mi Perfil</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNombre" className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            required
          />
        </Form.Group>

        <Form.Group controlId="formRut" className="mb-3">
          <Form.Label>RUT</Form.Label>
          <Form.Control
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            placeholder="Ej: 12.345.678-9"
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />
        </Form.Group>

        <Form.Group controlId="formDireccion" className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Ingresa tu dirección"
            required
          />
        </Form.Group>

        <Form.Group controlId="formTelefono" className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ej: +56 9 1234 5678"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar cambios
        </Button>
      </Form>
    </Container>
  );
}
