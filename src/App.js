import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { getList, getDetails } from "./api/api";
import List from "./views/List";
import Details from "./views/Details";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={getList}>Home</Link>
            </li>
            <li>
              <Link to="/details" onClick={getDetails}>Details</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/details">
            <Details />
          </Route>
          <Route path="/">
            <List />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

