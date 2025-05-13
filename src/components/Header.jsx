import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Header = ({ openCart }) => {
  return (
    <section id="header" className="py-5">
        <header className="bg-primary text-white py-5" id="hero">
        <Container className="d-flex justify-content-center align-items-center h-100">
            <Row className="w-100 text-center">
            <Col md={12} className="d-flex flex-column justify-content-center">
                <h1 className="display-4">Bienvenido a Mi Tienda</h1>
                <p className="lead">
                Descubre productos increíbles al mejor precio. ¡Compra con confianza!
                </p>
                {/* <Button variant="light" size="lg" onClick={openCart}>
                🛒 Ver Carrito
                </Button> */}
            </Col>
            {/* <Col md={6} className="d-flex justify-content-center mt-4 mt-md-0">
                <img
                src="https://via.placeholder.com/400x250"
                alt="Tienda"
                className="img-fluid rounded"
                />
            </Col> */}
            </Row>
        </Container>
        </header>
    </section>
  );
};

export default Header;
