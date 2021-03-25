import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import City from "./routes/city";
import State from "./routes/state";
import CityInState from "./routes/city-in-state";
import Brewery from "./routes/brewery";
import Home from "./routes/home";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/city/rochester">Rochester</Link>
        </li>
        <li>
          <Link to="/state/ohio">Ohio</Link>
        </li>
        <li>
          <Link to="/location/new_york/brooklyn">Brooklyn, Ny</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/brewery/:id">
            <Brewery />
          </Route>
          <Route path="/city/:city">
            <City />
          </Route>
          <Route path="/location/:state/:city">
            <CityInState />
          </Route>
          <Route path="/state/:state">
            <State />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

/**
 *
 * ! /breweries/:id
 * ! /city/:city
 * ! /state/:state
 *
 */
