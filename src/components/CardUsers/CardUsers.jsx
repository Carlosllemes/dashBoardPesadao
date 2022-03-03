import React, { Component } from "react";
import './style.css';
import { Card, Button, Col, Row } from "react-bootstrap";
import api from '../../services/api'
class CardUsers extends Component {
  
  state = {
    users: [],
  }

async componentDidMount(){
  const response = await api.get('users');
  this.setState({users: response.data})
}

  render() {
    const { users } = this.state;
    return (
      <Row>
        {users.map((user, index) => (
          <Col>
            <Card bg={'light'} key={index}>
              <Card.Body>
                <Card.Img variant="top" src={user.avatar_large_url} />
                <Card.Title className="small-font">{user.name}</Card.Title>
                <Card.Text>{user.demanders_count}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default CardUsers;
