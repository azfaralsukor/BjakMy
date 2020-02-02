import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Details from "./views/Details";
import List from "./views/List";

export default function App() {
  return <React.Fragment>
    <Router>
      <Switch>
        <Route path="/details">
          <Details />
        </Route>
        <Route path="/">
          <List />
        </Route>
      </Switch>
    </Router>
  </React.Fragment>;
}
