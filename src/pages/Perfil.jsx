import React, { useState, useEffect } from 'react';
import { Form, Button, Container,Toast, ToastContainer } from 'react-bootstrap';
import { API_URL } from '../utils/apiConfig';

export default function Perfil() {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    direccion: '',
    telefono: '',
  });

  const [originalData, setOriginalData] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Cargar datos del usuario desde localStorage/backend
  useEffect(() => {
    const usuarioLocal = JSON.parse(localStorage.getItem("user"));
    if (usuarioLocal) {
      fetchPerfil(usuarioLocal.id);
    }
  }, []);

  const localUser = JSON.parse(localStorage.getItem("user"));

  const fetchPerfil = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/perfil/${userId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localUser.token}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        // console.log(data)
        const datos = {nombre: data.name, rut: '1-9' ,email: data.email, direccion: '123 calle', telefono: '0000' }
        setFormData(datos);
        setOriginalData(datos);
      } else {
        throw new Error(data.message || "No se pudo cargar el perfil");
      }
    } catch (err) {
      console.error("Error al cargar perfil:", err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comparar con los datos originales para evitar guardar si no hay cambios
    if (JSON.stringify(formData) === JSON.stringify(originalData)) {
      setMensaje("No hay cambios para guardar");
      return;
    }
    const userId = localUser.id;
    try {
      const res = await fetch(`${API_URL}/perfil/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
          "Authorization": `Bearer ${localUser.token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log(data)

      if (!res.ok) throw new Error(data.message || "Error al guardar perfil");

      setMensaje("Perfil actualizado correctamente");
      setShowToast(true); 
      setTimeout(() => setShowToast(false), 2000);
      setOriginalData(formData); // actualizar datos originales
    } catch (err) {
      console.error("Error al actualizar perfil:", err.message);
      setMensaje("Error al guardar perfil");
    }
  };

  return (
    
    <Container className="mt-5 pt-5">
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="success">
          <Toast.Body className="text-white">Perfil Editado con Exito!</Toast.Body>
        </Toast>
     </ToastContainer>
      <h2 className="mb-4">Mi Perfil</h2>
      {mensaje && <p>{mensaje}</p>}
      <Form onSubmit={handleSubmit}>
        {/* Campos iguales que antes */}
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
