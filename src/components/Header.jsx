import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../utils/css/header.css'; // archivo CSS personalizado

const Header = ({ openCart }) => {
  return (
    <section id="header" className="header-section">
      <div className="header-overlay">
        <Container className="h-100 d-flex align-items-center justify-content-center">
          <Row className="w-100 text-center">
            <Col
              md={6}
              className="d-flex flex-column justify-content-center align-items-center text-white"
            >
              <h1 className="display-4">Bienvenido a Mi Tienda</h1>
              <p className="lead">
                Descubre productos increíbles al mejor precio. ¡Compra con confianza!
              </p>
              {/* <Button variant="light" size="lg" onClick={openCart}>
                🛒 Ver Carrito
              </Button> */}
            </Col>
            <Col md={6} className="d-none d-md-flex justify-content-center">
              {/* <img
                src="https://via.placeholder.com/400x250"
                alt="Vista previa de la tienda"
                className="img-fluid rounded shadow"
              /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Header;
