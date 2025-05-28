import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const NavbarSection = ({ openCart, openLogin }) => {
  const { user, logout } = useAuth();
  
  const scrollTo = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="sticky-top">
      <Container>
        <Navbar.Brand href="#header">Mi Tienda</Navbar.Brand>
        <Nav className="ml-auto align-items-center gap-2">
          <Nav.Link href="#products">Productos</Nav.Link>
          <Nav.Link href="#contact">Contacto</Nav.Link>
          <Button variant="outline-primary" onClick={openCart}>
            🛒 Carrito
          </Button>
          {user ? (
            <>
              <span className="mx-2">Hola, {user.name}</span>
              <Button variant="outline-danger" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
          <Button variant="outline-success" onClick={openLogin}>
              Iniciar sesión
          </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};


export default NavbarSection;
