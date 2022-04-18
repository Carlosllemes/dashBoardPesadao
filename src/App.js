import { useState, useEffect } from "react";
import Routes from "./model/routes/Routes";
import CardFilterTask from "./components/CardFilterTask";
import { Container } from "react-bootstrap";
import Api from "./services/api";
import Chart from "react-google-charts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../src/main.scss";
import _ from "lodash"
export default function App() {
  const api = new Api();
  const url = "tasks?user_id=desenvolvimento&";

  const [tasks, setTask] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    // fetchData();
  }, []);

  var data = [
    ["14/02/2022", 1],
    ["14/02/2022", 1],
    ["14/02/2022", 1],
    ["14/02/2022", 1],
    ["14/02/2022", 1],
    ["14/02/2022", 1],
    ["15/02/2022", 1],
    ["15/02/2022", 1],
    ["15/02/2022", 1],
    ["16/02/2022", 1],
    ["16/02/2022", 1],
    ["16/02/2022", 1],
    ["16/02/2022", 1],
    ["17/02/2022", 1],
    ["17/02/2022", 1],
    ["17/02/2022", 1],
  ];

  const teste = (data)=>{
    const values = _.groupBy(data, (value)=> value[0])
    const result = _.map(values, (value, key)=>{
      return [key, _.sumBy(value, (v)=> v[1])]
    })
    return [["Dia", "Quantidade"],...result]
  }

  teste(data)


  const options = {
    chart: {
      title: "Box Office Earnings in First Two Weeks of Opening",
      subtitle: "in millions of dollars (USD)",
    },
  };

  async function fetchData() {
    // fetch all tasks
    const closed_task = await api.getRquest(url + "is_closed=true&limit=10");
    setTask(closed_task);

    const is_working = await api.getRquest(url + "is_working_on=true");
    setProgress(is_working);

    const open_tasks = await api.getRquest(url + "is_closed=false&limit=10");
    setOpenTasks(open_tasks);
  }

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

  return (
    <>
      <Routes />
      {/* <FormSearch /> */}
      <Container className="tasks-section-dashboard">
        <CardFilterTask
          typeTask={paramers.alteracao}
          title={title.alteracao}
          filterCard={true}
          tasks={tasks}
        />
        <CardFilterTask
          typeTask={paramers.site}
          title={title.site}
          filterCard={true}
          tasks={tasks}
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
      <Container>
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={teste(data)}
          options={options}
        />
      </Container>
    </>
  );
}
