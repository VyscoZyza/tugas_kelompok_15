import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const Navbars = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Nav.Link className="text-light mr-5" href="#tugas">
        Tugas Akhir
      </Nav.Link>

      <Navbar.Brand className="ml-5" href="#home">
        Burjo Sayang
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto ml-auto">
          <Nav.Link eventKey={2} href="#memes">
            Kelompok 15
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbars;
