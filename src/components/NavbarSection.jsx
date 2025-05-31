import React from 'react';
import { Navbar,Nav,Container,Button,NavDropdown} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
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
            <Nav.Link as={Link} to="/#products">Productos</Nav.Link>
            <Nav.Link as={Link} to="/#contact">Contacto</Nav.Link>

            <Button variant="outline-primary" onClick={openCart}>
              🛒 Carrito
            </Button>

            {user ? (
              <NavDropdown title={`Hola, ${user.name}`} id="user-dropdown" align="end">
                <NavDropdown.Item href="/perfil">Mi perfil</NavDropdown.Item>
                <NavDropdown.Item href="/ventas">Mis ventas</NavDropdown.Item>
                <NavDropdown.Item href="/pedidos">Mis pedidos</NavDropdown.Item>
                <NavDropdown.Item href="/subir-producto">Subir producto</NavDropdown.Item>
                <NavDropdown.Divider />
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSection;
