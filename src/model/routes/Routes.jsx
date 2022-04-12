import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/";
export default function Routes() {
  
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
