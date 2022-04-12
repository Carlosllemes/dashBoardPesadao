import { useState, useEffect } from "react";
import { Card, CardGroup, Container } from "react-bootstrap";
import DropFilterCard from "../DropFilterCard/";
import Api from "../../services/api";
import "./style.scss";

export default function CardFilterTask (props){

  const [tasks, setTask] = useState([]);
  const [filterTask, setFilterTask] = useState([])

  useEffect(()=>{
    console.log('FDP DE EFFECT')
  }, [filterTask])

  useEffect(() => {
    const api = new Api()
    async function fetchData() {
      var response = await api.getRquest('tasks?user_id=desenvolvimento&is_closed=true&limit=10')
      setTask(response);
    }
    fetchData()
  }, []);


   function amountTasks(data, intervalDate) {
    try {
      let today = new Date().toLocaleDateString("pt-BR");
      let contador = 1;
      data.map((data) => {
        let dateTask = new Date(data.close_date).getTime();
        let dateFinish = timeTask(today, intervalDate);
        if (getTypeTask(data.type_name)) {
          if (dateTask > dateFinish) {
            contador++;
            console.log("contador "+contador)
          }
        }
        return contador;
      });
    } catch (err) {
      console.log(err);
    }
  }



  function timeTask(date, intervalDate) {
    var date = new Date();
    date.setDate(date.getDate() - intervalDate);
    console.log("data atual - "+intervalDate+ "dias "+date)
    return date;
  }

  function getTypeTask(task) {
    if (
      task === "Produção - Alt Nv. 2" ||
      task === "Produção - Alt Nv. 1" ||
      task === "Produção - Alt Nv. 3" ||
      task === "Produção - Alt Nv. 4"
    ) {
      return true;
    }
  }


 
    return (
      <CardGroup className="info-card">
        <Card.Body>
          <Container className="info-card--header">
            <Card.Text as="h5">
              Alterações <span>| {filterTask}</span>
            </Card.Text>

            <DropFilterCard
              amountDay={() => {amountTasks(tasks, 1);setFilterTask("Hoje")}}
              amountWeek={() => {amountTasks(tasks, 7);setFilterTask("Semana")}}
              amountMonth={() => {amountTasks(tasks, 30);setFilterTask("Mes")}}
            />
          </Container>
          <Container className="info-card--middle">
            <Card.Img
              className="rounded-circle d-flex align-items-center justify-content-center"
              src="icons/svg/sites-alteration.svg"
            />
            <Container>
              <h6>{props.nome}</h6>
              <p>
                <span className="text-success small pt-1 fw-bold">
                </span>
                  {tasks.length}
                <span className="text-muted small pt-2 ps-1">increase</span>
              </p>
            </Container>
          </Container>
        </Card.Body>
      </CardGroup>
    );
}
