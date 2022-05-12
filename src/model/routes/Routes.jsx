import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/";
export default function Routes() {
  return (
    <Router>
        <NavBar />
      <Route exact path="/">
        <Switch>

        </Switch>
      </Route>
    </Router>
  );
}
