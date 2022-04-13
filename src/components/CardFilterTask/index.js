import { useState, useEffect } from "react";
import { Card, CardGroup, Container } from "react-bootstrap";
import DropFilterCard from "../DropFilterCard/";
import Api from "../../services/api";
import "./style.scss";

export default function CardFilterTask(props) {
  const [tasks, setTask] = useState([]);
  const [filterTask, setFilterTask] = useState([]);
  const [alteration, setAlteration] = useState([]);

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

  function amountTasks(data, intervalDate) {
    try {
      let today = new Date().toLocaleDateString("pt-BR");
      let count = 1;
      data.map((data) => {
        let dateCloseTask = new Date(data.close_date).getTime();
        let dateFilter = timeTask(today, intervalDate).getTime();
        if (getTypeTask(data.type_name)) {
          if (dateCloseTask > dateFilter) setAlteration(count++);
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

  function getTypeTask(task) {
    const regex = /(.Alt*)/;
    let result = regex.test(task);
    if (result) return true;
  }

  return (
    <CardGroup className="info-card">
      <Card.Body>
        <Container className="info-card--header">
          <Card.Text as="h5">
            Alteracoes <span>| {filterTask}</span>
          </Card.Text>

          <DropFilterCard
            amountDay={() => {
              amountTasks(tasks, 1);
              setFilterTask("Hoje");
            }}
            amountWeek={() => {
              amountTasks(tasks, 7);
              setFilterTask("Semana");
            }}
            amountMonth={() => {
              amountTasks(tasks, 30);
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
            <h6>{alteration}</h6>
            <p>
              <span className="text-success small pt-1 fw-bold">
                fechados
              </span>
            </p>
          </Container>
        </Container>
      </Card.Body>
    </CardGroup>
  );
}
