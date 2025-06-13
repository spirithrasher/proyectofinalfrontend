import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { API_URL } from '../utils/apiConfig';

export default function SubirProducto() {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: null,
    seller_id: '',
    categoria_id: ''
  });
  const localUser = JSON.parse(localStorage.getItem("user"));

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
      const fetchCategorias = async () => {
        try {
          const response = await fetch(`${API_URL}/categorias`); // ajustá si usás un proxy o dominio diferente
          const data = await response.json();
          setCategorias(data);
        } catch (error) {
          console.error('Error al cargar las categorías:', error);
        }
      };
  
      fetchCategorias();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, imagen: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Debes iniciar sesión');
      return;
    }

    const form = new FormData();
      form.append('nombre', formData.nombre);
      form.append('precio', formData.precio);
      form.append('descripcion', formData.descripcion);
      form.append('categoria_id', formData.categoria_id);
      form.append('imagen', formData.imagen);
      form.append('seller_id', user.id); //ID del usuario
        
      console.log(form)

      try {
        const res = await fetch(`${API_URL}/productos`, {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${localUser.token}`
          },
          body: form
        });
        console.log(res)
        if (!res.ok) throw new Error('Error al subir el producto');

        const data = await res.json();
        console.log('Producto creado:', data);
        alert('Producto subido con éxito');
      } catch (err) {
        console.error(err);
        alert('Ocurrió un error al subir el producto');
      }
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
        
        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
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
