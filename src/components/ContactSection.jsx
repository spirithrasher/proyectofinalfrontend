import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const ContactSection = () => (
  <section className="py-5 bg-light" id="contact">
    <Container>
      <h2 className="text-center mb-4">Contáctanos</h2>
      <Form style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Tu nombre" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="tu@email.com" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit">Enviar</Button>
      </Form>
    </Container>
  </section>
);

export default ContactSection;
