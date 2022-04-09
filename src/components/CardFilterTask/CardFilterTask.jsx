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
      alteracoes: 0,
      selectFilter: 'HOJE'
    };
  }
  

 async response(){
  const api = new Api();
  var response = await api.getRquest(
    "tasks?is_closed=true&user_id=desenvolvimento&limit=100"
  );
  return response
}


   amountTasks(days,selectFilter, response) {
     console.log(response)
    try {
      let contador = 0;
      let today = new Date().toLocaleDateString("pt-BR");
      response.map((response) => {
        let dataTask = new Date(response.close_date).getTime();
        let dataWeek = this.timeTask(today, days);

        if (this.getTypeTask(response.type_name)) {
          if (dataTask > dataWeek) {
            contador++;
          }
        }
        return contador;
      });
      this.setState({ alteracoes: contador,selectFilter : selectFilter  });
    } catch (err) {
      console.log(err);
    }
  }

  timeTask(date, days) {
    var date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }

  getTypeTask(task) {
    if (
      task == "Produção - Alt Nv. 2" ||
      task == "Produção - Alt Nv. 1" ||
      task == "Produção - Alt Nv. 3" ||
      task == "Produção - Alt Nv. 4"
    ) {
      return true;
    }
  }

  render() {
    return (
      <CardGroup className="info-card">
        <Card.Body>
          <Container className="info-card--header">
            <Card.Text as="h5">
              Alterações <span>|{this.state.selectFilter} </span>
            </Card.Text>

            <DropFilterCard
              amountDay={() => this.amountTasks(1,  "HOJE", this.response()).bind}
              amountWeek={() => this.amountTasks(7, "SEMANA", this.response()).bind}
              amounMounth={() => this.amountTasks(30, "MES", this.response()).bind}
            />
          </Container>
          <Container className="info-card--middle">
            <Card.Img
              className="rounded-circle d-flex align-items-center justify-content-center"
              src="icons/svg/sites-alteration.svg"
            />
            <Container>
              <h6>{this.state.alteracoes}</h6>
              <p>
                <span className="text-success small pt-1 fw-bold">
                  {this.state.alteracoes}
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
