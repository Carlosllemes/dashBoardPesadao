import "./style.scss";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar () {
  
    return (
      <Navbar
        className="mb-2"
        collapseOnSelect
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="#home">Producao Doutores</Navbar.Brand>
          {/* Mobile navbar*/}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {/* End navbar*/}

          {/* Navbar Begin */}
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as="div" className="menu-link">
                <Link to="/">Tarefas</Link>
              </Nav.Link>
              <Nav.Link as="div">
                <Link to="/task">Task</Link>
              </Nav.Link>
              {/* Dropdown */}
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item>Dropdown</NavDropdown.Item>
                <NavDropdown.Item>Dropdown</NavDropdown.Item>
              </NavDropdown>
              {/*End Dropdown */}
            </Nav>
            <Nav>
              <Nav.Link as="div">
                <Link to="/meme">Meme</Link>
              </Nav.Link>
            </Nav>
            {/* End Navbar */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

