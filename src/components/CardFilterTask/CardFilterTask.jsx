import { Component } from "react";
import { Card, CardGroup, Container } from "react-bootstrap";
import DropFilterCard from "../DropFilterCard/";
import Api from "../../services/api";
import "./style.scss";

class CardFilterTask extends Component {
  constructor(props) {
    super(props);
    this.amount = 30;
    this.state = {
      alteracoesDia: 0,
      alteracoesSemana: 0,
    };
  }

  async amountTasksToday() {
    const api = new Api();
    try {
      var response = await api.getRquest(
        "tasks?sort_dir=desc&is_closed=true&user_id=desenvolvimento&limit=50"
      );
      // let amount = Object.keys(response).length;

      let contador = 0;
      response.map((response) => {
        let dataTasks = new Date(response.close_date);
        let todayDate = this.todayDate();
        let taskDate = dataTasks.toLocaleDateString("pt-BR");
        console.log(taskDate);

        if (taskDate === todayDate) {
          contador++;
        }

        return contador;
      });
      this.setState({ alteracoesDia: contador });
    } catch (err) {
      console.log(err);
    }
  }

  async amountTasksWeek() {
    const api = new Api();
    try {
      var response = await api.getRquest(
        "tasks?sort_dir=desc&is_closed=true&user_id=desenvolvimento&limit=150"
      );
      // let amount = Object.keys(response).length;

      let contador = 0;
      response.map((response) => {
        let dataTasks = new Date(response.close_date);
        let weekDate = this.weekDate();
        console.log(weekDate)
        let taskDate = dataTasks.toLocaleDateString("pt-BR");
        console.log(taskDate)
        // console.log(weekDate);
        // console.log(taskDate);

        if (weekDate > taskDate ) {
          contador++;
        }

        return contador;
      });
      this.setState({ alteracoesDia: contador });
    } catch (err) {
      console.log(err);
    }
  }


  weekDate(date) {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toLocaleDateString("pt-BR");
  }

  todayDate(date) {
    var date = new Date();
    date.setDate(date.getDate());
    return date.toLocaleDateString("pt-BR");
  }

  monthDate(date) {
    var date = new Date();
    date.setDate(date.getDate());
    return date.toLocaleDateString("pt-BR");
  }

  render() {
    return (
      <CardGroup className="info-card">
        <Card.Body>
          <Container className="info-card--header">
            <Card.Text as="h5">
              Alterações <span>| Hoje</span>
            </Card.Text>

            <DropFilterCard amountDay={() => this.amountTasksWeek().bind} />
          </Container>
          <Container className="info-card--middle">
            <Card.Img
              className="rounded-circle d-flex align-items-center justify-content-center"
              src="icons/svg/sites-alteration.svg"
            />
            <Container>
              <h6>{this.state.alteracoesDia}</h6>
              <p>
                <span className="text-success small pt-1 fw-bold">
                  {/* {this.state.alteracoes} */}
                </span>
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
