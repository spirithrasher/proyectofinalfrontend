import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import categorias from '../data/categorias.json';

const NavbarSection = ({ openCart, openLogin, openRegister }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/categorias'); // ajustá si usás un proxy o dominio diferente
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleLogout = () => {
    logout();
  };


  const handleCategoriaSelect = (categoriaId) => {
    navigate(`/?categoria=${categoriaId}`);
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="sticky-top shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Mi Tienda</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={Link} to="/#products">Productos</Nav.Link>

            <NavDropdown title="Categorías" id="categorias-dropdown">
              <NavDropdown.Item as={Link} to="/">
                Todos los productos
              </NavDropdown.Item>
              {categorias.map(cat => (
                <NavDropdown.Item key={cat.id} onClick={() => handleCategoriaSelect(cat.id)}>
                  {cat.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Button variant="outline-primary" onClick={openCart}>
              🛒 Carrito
            </Button>

            {user ? (
              <NavDropdown title={`Hola, ${user.name}`} id="user-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/perfil">Mi Perfil</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ventas">Mis Ventas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/pedidos">Mis Compras</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/subir-producto">Subir producto</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button variant="outline-success" onClick={openLogin}>
                  Iniciar sesión
                </Button>
                <Button variant="outline-secondary" onClick={openRegister}>
                  Registrarse
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSection;
