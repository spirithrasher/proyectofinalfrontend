import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto" style={{ borderTop: '3px solid #ffc107' }}>
      <Container>
        <Row>
          <Col className="text-center mt-3">
            <p>&copy; 2025 Mi Tienda. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
