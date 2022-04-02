import { Component } from "react";
import { Card, CardGroup, Container } from "react-bootstrap";
import DropFilterCard from "../DropFilterCard/"
import "./style.scss";
import Api from "../../services/api"

class CardFilterTask extends Component {
  
  render() {
    return (
      
      <CardGroup className="info-card">
        <Card.Body>
          <Container className="info-card--header">
            <Card.Text as="h5">
              Alterações <span>| Hoje</span>
            </Card.Text>

            <DropFilterCard/>
          </Container>
          <Container className="info-card--middle">
            <Card.Img
              className="rounded-circle d-flex align-items-center justify-content-center"
              src="icons/svg/sites-alteration.svg"
            />
            <Container>
              <h6>145</h6>
              <p>
                <span className="text-success small pt-1 fw-bold">12</span>
                <span className="text-muted small pt-2 ps-1">increase</span>
              </p>
            </Container>
          </Container>
        </Card.Body>
      </CardGroup>
   
    );
  }
}

export default CardFilterTask;
