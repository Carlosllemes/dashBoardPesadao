import React, { Component } from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import CardTask from "../CardTask";
import CardUsers from '../CardUsers';

class NavBar extends Component {
  render() {
    return (
      <Router>
        <Navbar
          className="mb-2"
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Container>
            <Navbar.Brand href="#home">React Teste</Navbar.Brand>
            {/* Mobile navbar*/}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            {/* End navbar*/}


              {/* Navbar Begin */}
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/">Users</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/task">Task</Link>
                </Nav.Link>
                {/* Dropdown */}
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item>Action</NavDropdown.Item>
                  <NavDropdown.Item>
                    Another action
                  </NavDropdown.Item>
                </NavDropdown>
                {/*End Dropdown */}
              </Nav>
              <Nav>
                <Nav.Link>

                
                <Link to="/meme">
                  Meme
                </Link>
                </Nav.Link>
              </Nav>
              {/* End Navbar */}
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route path="/task">
            <CardTask/>
          </Route>
          <Route path="/meme">
            é meme
          </Route>
          <Route path="/">
            <CardUsers />
          </Route>
          
        </Switch>
      </Router>
    );
  }
}

export default NavBar;
