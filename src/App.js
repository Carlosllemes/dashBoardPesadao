import { useState, useEffect } from "react";
import Routes from "./model/routes/Routes";
import CardFilterTask from "./components/CardFilterTask";
import CloseBarChart from "./components/BarChart/close_task";
import { Container } from "react-bootstrap";
import Api from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../src/main.scss";
import _ from "lodash";

export default function App() {
  const api = new Api();
  const url = "tasks?user_id=desenvolvimento&";

  const [closeTasks, setCloseTasks] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const paramers = {
    alteracao: "1",
    site: "2",
    progress: "3",
    open: "4",
  };

  const title = {
    alteracao: "Alterações",
    site: "Sites",
    progress: "Desenvolvimento",
    open: "Pendentes",
  };

  const groupByClosed = (data) => {
    const values = _.groupBy(data, (value) =>
      new Date(value.close_date).toLocaleDateString("pt-br")
    );
    const result = _.map(values, (value, key) => {
      return [key, _.sumBy(value, (v) => 1)];
    });
    return [["Dia", "Quantidade"], ...result];
  };

  async function fetchData() {
    // fetch all tasks
    const closed_task = await api.getRquest(
      url + "sort=close_date&sort_dir=desc&is_closed=true&limit=50"
    );
    setCloseTasks(closed_task);

    const is_working = await api.getRquest(url + "is_working_on=true");
    setProgress(is_working);

    const open_tasks = await api.getRquest(url + "is_closed=false&limit=1");
    setOpenTasks(open_tasks);
  }

  return (
    <>
      <Routes />
      {/* <FormSearch /> */}
      <Container className="tasks-section-dashboard">
        <CardFilterTask
          typeTask={paramers.alteracao}
          title={title.alteracao}
          filterCard={true}
          tasks={closeTasks}
        />
        <CardFilterTask
          typeTask={paramers.site}
          title={title.site}
          filterCard={true}
          tasks={closeTasks}
        />
        <CardFilterTask
          typeTask={paramers.progress}
          title={title.progress}
          tasks={progress}
        />
        <CardFilterTask
          typeTask={paramers.open}
          title={title.open}
          tasks={openTasks}
        />
      </Container>
      <CloseBarChart teste={groupByClosed(closeTasks)} chartType={"BarChart"} />
    </>
  );
}
