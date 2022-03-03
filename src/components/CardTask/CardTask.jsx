import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import api from "../../services/api";
class CardUsers extends Component {
  state = {
    tasks: [],
  };

  async componentDidMount() {
    const response = await api.get(
      "tasks?is_closed=false&user_id=desenvolvimento&limit=10"
    );
    this.setState({ tasks: response.data });
  }

  idFresh = (e)=>{
    let id = e.substring(e.length - 5)
    return id
  }

  render() {
    const { tasks } = this.state;
    return (
      <Row>
        {console.log(tasks)}
        {tasks.map((task, index) => (
          <Col key={index}>
            <Card className="mt-1" bg={"light"}>
              <Card.Body>
                <Card.Header className="small-font">
                  {task.type_name}
                </Card.Header>
                <Card.Title className="small-font">
                  {task.project_name}
                </Card.Title>
                <Card.Text>{task.title}</Card.Text>
                <Button
                  variant="primary"
                  target="_blank"
                  href={"https://drdaweb.freshdesk.com/a/tickets/" + this.idFresh(task.title)}
                >
                  {"Fresh " + this.idFresh(task.title)}
                </Button>
                <Button
                  variant="primary"
                  target="_blank"
                  href={"https://runrun.it/pt-BR/tasks/" + task.id}
                >
                  {"Runrun " + task.id}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default CardUsers;
