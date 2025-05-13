import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavbarSection = ({ openCart }) => {
  const scrollTo = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="sticky-top">
      <Container>
        <Navbar.Brand href="#header">Mi Tienda</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#products">Productos</Nav.Link>
          <Nav.Link href="#contact">Contacto</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarSection;
