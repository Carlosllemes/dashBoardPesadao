import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../src/main.scss";
import Routes from "./model/routes/Routes";
import CardFilterTask from "./components/CardFilterTask";
import { Container } from "react-bootstrap";

export default function App() {
  
    return (
      <>
        <Routes />
        {/* <FormSearch /> */}
        <Container className="tasks-section-dashboard">
          <CardFilterTask nome="alterações" />
        </Container>
      </>
    );
  
}
