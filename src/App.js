import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../src/main.scss";
import Routes from "./model/routes/Routes";
import CardFilterTask from "./components/CardFilterTask";
import { Container } from "react-bootstrap";

export default function App() {
  const paramers = {
    alteracao: "1",
    site: "2",
    dev: "3",
    pende: "4",
  };
  const title = {
    alteracao: "Alterações",
    site: "Sites",
    dev: "Desenvolvimento",
    pende: "Pendentes",
  };

  return (
    <>
      <Routes />
      {/* <FormSearch /> */}
      <Container className="tasks-section-dashboard">
        <CardFilterTask typeTask={paramers.alteracao} title={title.alteracao} />
        <CardFilterTask typeTask={paramers.site} title={title.site} />
        <CardFilterTask typeTask={paramers.dev} title={title.dev} />
        <CardFilterTask typeTask={paramers.pende} title={title.pende} />
      </Container>
    </>
  );
}
