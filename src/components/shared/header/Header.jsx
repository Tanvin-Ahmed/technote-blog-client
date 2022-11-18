import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Container>
        <Navbar.Brand href="#cover">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="m-auto"></div>
          <Nav>
            <Nav.Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link
                  to="/?cat=web-development"
                  style={{ textDecoration: "none" }}
                >
                  Web Development
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/?cat=app-development"
                  style={{ textDecoration: "none" }}
                >
                  App Development
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/?cat=comperirive-programming"
                  style={{ textDecoration: "none" }}
                >
                  Competitive Programming
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/?cat=it" style={{ textDecoration: "none" }}>
                  IT
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/?cat=computer-science"
                  style={{ textDecoration: "none" }}
                >
                  Computer Science
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/?cat=electronics" style={{ textDecoration: "none" }}>
                  Electronics
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>Jhone</Nav.Link>
            <Nav.Link>logout</Nav.Link>
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link
                  to="/admin/pending-blogs/1"
                  style={{ textDecoration: "none" }}
                >
                  Manage Pending Blogs
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/admin/add-new-admin"
                  style={{ textDecoration: "none" }}
                >
                  Add new admin
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              <Link to="/write" className="write-button" title="Write a note">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
