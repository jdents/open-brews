import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home, { HomeFallback } from "./routes/home";
import Brewery, { BreweryFallback } from "./routes/brewery";

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
        <React.Suspense fallback="Loading">
          <Switch>
            <Route exact path="/">
              <React.Suspense fallback={<HomeFallback />}>
                <Home />
              </React.Suspense>
            </Route>
            <Route path="/brewery/:id">
              <React.Suspense fallback={<BreweryFallback />}>
                <Brewery />
              </React.Suspense>
            </Route>
            <Route path="/city/:city">
              <h1>City </h1>
            </Route>
            <Route path="/location/:state/:city">
              <h1>CityInState </h1>
            </Route>
            <Route path="/state/:state">
              <h1>State </h1>
            </Route>
          </Switch>
        </React.Suspense>
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
