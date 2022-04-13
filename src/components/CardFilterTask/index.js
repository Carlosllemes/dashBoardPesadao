import { useState, useEffect } from "react";
import { Card, CardGroup, Container } from "react-bootstrap";
import DropFilterCard from "../DropFilterCard/";
import Api from "../../services/api";
import "./style.scss";

export default function CardFilterTask(props) {
  const [tasks, setTask] = useState([]);
  const [filterTask, setFilterTask] = useState([]);
  const [alteration, setAlteration] = useState([]);
  const [sites, setSites] = useState();

  useEffect(() => {
    const api = new Api();
    async function fetchData() {
      var response = await api.getRquest(
        "tasks?user_id=desenvolvimento&is_closed=true&limit=30"
      );
      setTask(response);
      setAlteration(0);
      setFilterTask("Hoje");
    }
    fetchData();
  }, []);

  function amountTasks(data, intervalDate, type) {
    try {
      let today = new Date().toLocaleDateString("pt-BR");
      let count = 1;
      data.map((data) => {
        let dateCloseTask = new Date(data.close_date).getTime();
        let dateFilter = timeTask(today, intervalDate).getTime();
        if (dateCloseTask > dateFilter) {
          if (getTypeTask(data.type_name, type) === 1) {
            console.log("hahah");
            setAlteration(count++);
          }
          if (getTypeTask(data.type_name, type) === 2) {
            console.log("hehebebe");
            setSites(count++);
          }
        }
        return count;
      });
    } catch (err) {
      console.log(err);
    }
  }

  function timeTask(date, intervalDate) {
    var date = new Date();
    date.setDate(date.getDate() - intervalDate);
    return date;
  }

  function getTypeTask(task, type) {
    if (type === "1") {
      const regex = /(.Alt*)/;
      let result = regex.test(task);
      if (result) return 1;
    }
    if (type === "2") {
      const regex = /(.Sit*)/;
      let result = regex.test(task);
      if (result) return 2;
    }
  }

  return (
    <CardGroup className="info-card">
      <Card.Body>
        <Container className="info-card--header">
          <Card.Text as="h5">
            {props.nome} <span>| {filterTask}</span>
          </Card.Text>

          <DropFilterCard
            amountDay={() => {
              amountTasks(tasks, 1, props.typeTask);
              setFilterTask("Hoje");
            }}
            amountWeek={() => {
              amountTasks(tasks, 7, props.typeTask);
              setFilterTask("Semana");
            }}
            amountMonth={() => {
              amountTasks(tasks, 30, props.typeTask);
              setFilterTask("Mes");
            }}
          />
        </Container>
        <Container className="info-card--middle">
          <Card.Img
            className="rounded-circle d-flex align-items-center justify-content-center"
            src="icons/svg/sites-alteration.svg"
          />
          <Container>
            <h6>
              {props.typeTask ==="1" ? alteration : sites}
            </h6>
            <p>
              <span className="text-success small pt-1 fw-bold">fechados</span>
            </p>
          </Container>
        </Container>
      </Card.Body>
    </CardGroup>
  );
}
