import { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./style.scss"

class FormSearch extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form className="form-search">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter email" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FormSearch;
