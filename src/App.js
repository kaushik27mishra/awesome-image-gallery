import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/results" component={Results} />
      </Switch>
    </>
  );
}

export default App;
