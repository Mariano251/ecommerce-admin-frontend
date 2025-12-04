import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './navbar.scss'; // ← donde está la customización

const Hamburguer: React.FC = () => {
  return (
    <Navbar expand={false} className="transparent-navbar">
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="custom-offcanvas"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Menú
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="flex-column nav-links">
              <Nav.Link as={Link} to="/">INICIO</Nav.Link>
              <Nav.Link as={Link} to="/shop">PRODUCTOS</Nav.Link>
              <Nav.Link as={Link} to="/my-orders">MIS ÓRDENES</Nav.Link>
              <Nav.Link as={Link} to="/cart">CARRITO DE COMPRAS</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Hamburguer;
