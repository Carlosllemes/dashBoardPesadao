import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
class Routes extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/task">
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default Routes;
