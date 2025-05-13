import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Iconos de redes sociales

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          {/* Columna 1: Enlaces */}
          <Col md={4} className="text-center text-md-start mb-3">
            <h5>Enlaces rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-white">Inicio</a></li>
              <li><a href="#!" className="text-white">Productos</a></li>
              <li><a href="#!" className="text-white">Contacto</a></li>
              <li><a href="#!" className="text-white">Acerca de</a></li>
            </ul>
          </Col>

          {/* Columna 2: Redes sociales */}
          <Col md={4} className="text-center mb-3">
            <h5>Síguenos</h5>
            <div className="d-flex justify-content-center">
              <Button variant="link" className="text-white me-3">
                <FaFacebook size={30} />
              </Button>
              <Button variant="link" className="text-white me-3">
                <FaTwitter size={30} />
              </Button>
              <Button variant="link" className="text-white me-3">
                <FaInstagram size={30} />
              </Button>
              <Button variant="link" className="text-white me-3">
                <FaLinkedin size={30} />
              </Button>
            </div>
          </Col>

          {/* Columna 3: Información de contacto */}
          <Col md={4} className="text-center text-md-end">
            <h5>Contacto</h5>
            <p>Email: contacto@mitienda.com</p>
            <p>Tel: +123 456 789</p>
          </Col>
        </Row>
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
