import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const total = 25000;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">🍕 Pizzería Mamma Mia!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link href="#">🔓 Profile</Nav.Link>
                <Nav.Link onClick={() => setIsLoggedIn(false)}>
                  🔒 Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => setIsLoggedIn(true)}>
                  🔐 Login
                </Nav.Link>
                <Nav.Link href="#">🔐 Register</Nav.Link>
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
