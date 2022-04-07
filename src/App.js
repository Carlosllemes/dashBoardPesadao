import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../src/main.scss";
import "../src/app.scss";
import Routes from "./model/routes/Routes";
// import FormSearch from "./components/FormSearch";
import CardFilterTask from "./components/CardFilterTask";
import { Container } from "react-bootstrap";
// import Api from "./services/api";

class App extends Component {
  render() {
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
}

export default App;
