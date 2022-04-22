import { useState, useEffect } from "react";
import Routes from "./model/routes/Routes";
import CardFilterTask from "./components/CardFilterTask";
import CloseBarChart from "./components/BarChart/close_task";
import { Container, Row, Col } from "react-bootstrap";
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

  useEffect(() => {
    fetchData();
  }, []);

  const paramers = {
    alteracao: {
      type: "1",
      name: "Alterações",
    },
    site: {
      type: "2",
      name: "Sites",
    },
    progress: {
      type: "3",
      name: "Desenvolvimento",
    },
    open: {
      type: "4",
      name: "Pendentes",
    },
  };

  //Funcao busca dados json type_name
  const closeByTypeName = _.groupBy(closeTasks, (value) => value.type_name);
  //Funcao busca dados json responsible_name
  const closeByTypeResponsible = _.groupBy(
    closeTasks,
    (value) => value.responsible_name
  );
  //Funcao busca dados json close_date
  const closeByDate = _.groupBy(closeTasks, (value) =>
    new Date(value.close_date).toLocaleDateString("pt-br")
  );

  // Agrupa as colunas passadas pelos dados
  const groupBy = (data, column, row) => {
    // faz uma interacao para cada valor da tabela
    const result = _.map(data, (value, key) => {
      // soma os valores das linhas , neste caso o padrao é 1
      return [key, _.sumBy(value, (v) => 1)];
    });
    // adiciona os dados ao array result
    return [[column, row], ...result];
  };

  return (
    <>
      <Routes />
      {/* <FormSearch /> */}
      <Container className="tasks-section-dashboard">
        <CardFilterTask
          typeTask={paramers.alteracao.type}
          title={paramers.alteracao.name}
          filterCard={true}
          tasks={closeTasks}
        />
        <CardFilterTask
          typeTask={paramers.site.type}
          title={paramers.site.name}
          filterCard={true}
          tasks={closeTasks}
        />
        <CardFilterTask
          typeTask={paramers.progress.type}
          title={paramers.progress.name}
          tasks={progress}
        />
        <CardFilterTask
          typeTask={paramers.open.type}
          title={paramers.open.name}
          tasks={openTasks}
        />
      </Container>
      <Container>
        <Row>
          <CloseBarChart
            groupBy={groupBy(closeByDate, "Quantidade", "Dia")}
            chartType={"LineChart"}
            hAxis={-1}
          />
        <CloseBarChart groupBy={groupBy(closeByTypeName, "Tipo", "Quantidade")} chartType={"LineChart"} />
        </Row>
      </Container>

      {/* {/* <CloseBarChart groupBy={groupBy(closeByTypeName, "Tipo", "Quantidade")} chartType={"BarChart"} /> */}
    </>
  );
}
