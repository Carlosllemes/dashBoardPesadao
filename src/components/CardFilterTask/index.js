import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDisplay,
  faFileSignature,
  faFileCode,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { Card, CardGroup, Container } from "react-bootstrap";
import DropFilterCard from "../DropFilterCard/";
import "./style.scss";

export default function CardFilterTask(props) {
  const [sites, setSites] = useState([]);
  const [alteration, setAlteration] = useState([]);
  const [filterTask, setFilterTask] = useState([]);


  function countTypeTask(data, intervalDate, type) {
    try {
      // Count total of interation
      let count = 1;
      // Map data tasks
      data.map((data, key) => {
        // tasks date closed timestamp
        let dateCloseTask = new Date(data.close_date).getTime();
        let dateFilter = timeTask(intervalDate).getTime();
        // if tasks date close is biggest that date of filter then count +1
        if (dateCloseTask > dateFilter) {
          // paramers alteration
          if (getTypeTask(data.type_name, type) === 1) {
            setAlteration(count++);
          }
          // paramers sites
          if (getTypeTask(data.type_name, type) === 2) {
            setSites(count++);
          }
        }
        return count;
      });
    } catch (err) {
      console.log(err);
    }
  }

  function timeTask(intervalDate) {
    try {
      let today = new Date();
      today.setDate(today.getDate() - intervalDate);
      return today;
    } catch (err) {
      console.log(err);
    }
  }

  function getTypeTask(data, type) {
    try {
      if (type === "1") {
        const regex = /(.Alt*)/;
        let result = regex.test(data);
        if (result) return 1;
      }
      if (type === "2") {
        const regex = /(.Sit*)/;
        let result = regex.test(data);
        if (result) return 2;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CardGroup className="info-card">
      <Card.Body>
        <Container className="info-card--header">
          <Card.Text as="h5">
            {props.title} <span>| {filterTask}</span>
          </Card.Text>
          {props.filterCard && (
            <DropFilterCard
              amountDay={() => {
                countTypeTask(props.tasks, 1, props.typeTask);
                setFilterTask("Hoje");
              }}
              amountWeek={() => {
                countTypeTask(props.tasks, 7, props.typeTask);
                setFilterTask("Semana");
              }}
              amountMonth={() => {
                countTypeTask(props.tasks, 30, props.typeTask);
                setFilterTask("Mês");
              }}
            />
          )}
        </Container>
        <Container className="info-card--middle">
          {props.typeTask === "1" && <FontAwesomeIcon icon={faFileSignature} />}
          {props.typeTask === "2" && <FontAwesomeIcon icon={faDisplay} />}
          {props.typeTask === "3" && <FontAwesomeIcon icon={faFileCode} />}
          {props.typeTask === "4" && <FontAwesomeIcon icon={faFolder} />}
          <Container>
            {props.typeTask === "1" && <h6>{alteration}</h6>}
            {props.typeTask === "2" && <h6>{sites}</h6>}
            {props.typeTask === "3" && <h6>{props.tasks.length}</h6>}
            {props.typeTask === "4" && <h6>{props.tasks.length}</h6>}
          </Container>
        </Container>
      </Card.Body>
    </CardGroup>
  );
}
