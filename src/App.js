import React from "react";
import { Router, Switch } from "react-router-dom";
import Home from "./page/Home";
import Results from "./page/Results";
import "./App.css";

function App() {
  return (
    <>
      <Switch>
        <Router exact path="/" component={Home} />
        <Router path="/results:id" component={Results} />
      </Switch>
    </>
  );
}

export default App;
