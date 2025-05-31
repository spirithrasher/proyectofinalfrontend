import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavbarSection = ({ openCart, openLogin, openRegister }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const categorias = [
    { id: 1, nombre: "Electrónica" },
    { id: 2, nombre: "Ropa" },
    { id: 3, nombre: "Hogar" }
  ];

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
                  {cat.nombre}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link as={Link} to="/#contact">Contacto</Nav.Link>

            <Button variant="outline-primary" onClick={openCart}>
              🛒 Carrito
            </Button>

            {user ? (
              <NavDropdown title={`Hola, ${user.name}`} id="user-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/perfil">Mi perfil</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ventas">Mis ventas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/pedidos">Mis pedidos</NavDropdown.Item>
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
