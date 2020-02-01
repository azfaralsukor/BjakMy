import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { getList, getDetails } from "./api/api";

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
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Details() {
  return <h2>Details</h2>;
}
