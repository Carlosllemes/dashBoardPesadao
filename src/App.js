import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../src/main.scss";
import "../src/app.scss";
import Header from "./model/Header";
// import FormSearch from "./components/FormSearch";
import CardFilterTask from "./components/CardFilterTask";
import { Container } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        {/* <FormSearch /> */}
        <Container className="tasks-section-dashboard">
          <CardFilterTask />
        </Container>
      </>
    );
  }
}

export default App;
