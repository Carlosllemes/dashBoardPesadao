import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDisplay,
  faFileSignature,
  faFileCode,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { Card, CardGroup, Container } from "react-bootstrap";
import DropFilterCard from "../DropFilterCard/";
import Api from "../../services/api";
import "./style.scss";

export default function CardFilterTask(props) {
  const [tasks, setTask] = useState([]);
  const [filterTask, setFilterTask] = useState([]);
  const [alteration, setAlteration] = useState([]);
  const [sites, setSites] = useState([]);
  const [progress, setProgress] = useState([]);
  const [pending, setPending] = useState([]);

  // Use fetch api during load page
  useEffect(() => {
    async function fetchData() {
      const api = new Api();
      // fetch all tasks
      var responseClosed = await api.getRquest(
        "tasks?user_id=desenvolvimento&is_closed=true&limit=50"
      );
      // fetch tasks in progress
      var responseProgress = await api.getRquest(
        "tasks?user_id=desenvolvimento&is_working_on=true"
      );
      // fetch pending tasks
      var responsePending = await api.getRquest(
        "tasks?user_id=desenvolvimento&is_closed=false"
      );
      // Set value of tasks close
      setTask(responseClosed);
      // Set value of tasks in progress
      setProgress(responseProgress);
      // Set value of tasks pending
      setPending(responsePending);
      setSites(0);
      setAlteration(0);
      setFilterTask("Hoje");
    }
    fetchData();
  }, []);

  // takes the data and filters each by task type
  function amountTasks(data, intervalDate, type) {
    try {
      // insert date today Ex : 01/01/2020
      let today = new Date().toLocaleDateString("pt-BR");
      // Count total of interation
      let count = 1;
      // Map data tasks
      data.map((data) => {
        // tasks date closed timestamp
        let dateCloseTask = new Date(data.close_date).getTime();
        //  call the function that add date filter in days
        let dateFilter = timeTask(today, intervalDate).getTime();
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

  function timeTask(date, intervalDate) {
    try {
      var date = new Date();
      date.setDate(date.getDate() - intervalDate);
      return date;
    } catch (err) {
      console.log(err);
    }
  }

  function getTypeTask(task, type) {
    try {
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
          {props.typeTask !== "3" && props.typeTask !== "4" && (
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
            {props.typeTask === "3" && <h6>{progress.length}</h6>}
            {props.typeTask === "4" && <h6>{pending.length}</h6>}
          </Container>
        </Container>
      </Card.Body>
    </CardGroup>
  );
}
