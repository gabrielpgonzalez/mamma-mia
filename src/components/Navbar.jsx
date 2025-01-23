import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importar Link para navegación interna

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const total = 25000;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🍕 Pizzería Mamma Mia!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  🔓 Profile
                </Nav.Link>
                <Nav.Link onClick={() => setIsLoggedIn(false)}>
                  🔒 Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  🔐 Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  🔐 Register
                </Nav.Link>
              </>
            )}
            <Nav.Link href="#">🛒 Total: ${total.toLocaleString()}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
