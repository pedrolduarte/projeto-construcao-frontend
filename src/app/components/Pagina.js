'use client'

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Pagina.css';

export default function Pagina({ titulo, children }) {
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" className="navbar-custom">
        <Container>
          <Navbar.Brand href="/" className="navbar-logo"> GeekLand </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/usuarios" className="nav-link-custom">Usuários</Nav.Link>
              <Nav.Link href="/animes" className="nav-link-custom">Animes</Nav.Link>
              <Nav.Link href="/mangas" className="nav-link-custom">Mangás</Nav.Link>
              <Nav.Link href="/games" className="nav-link-custom">Games</Nav.Link>
              <Nav.Link href="/quadrinhos" className="nav-link-custom">Quadrinhos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="bg-primary text-center text-white py-1 title-container">
        <h1 className="title">{titulo}</h1>
      </div>

      <Container className="d-flex justify-content-center mt-4">
        {children}
      </Container>

    </>
  );
}
