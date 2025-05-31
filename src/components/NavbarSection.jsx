import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const NavbarSection = ({ openCart, openLogin, openRegister }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="sticky-top shadow-sm">
      <Container>
        <Navbar.Brand href="#header">Mi Tienda</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link href="#products">Productos</Nav.Link>
            <Nav.Link href="#contact">Contacto</Nav.Link>
            {user ? (
              <NavDropdown title={`Hola, ${user.name}`} id="user-dropdown" align="end">
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </NavDropdown.Item>
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
            <Button variant="outline-primary" onClick={openCart}>
              🛒 Carrito
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSection;
