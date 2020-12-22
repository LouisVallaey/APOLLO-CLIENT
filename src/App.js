import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CustomerAddPage from "./pages/CustomerAddPage";
import CustomerPage from "./pages/CustomerPage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <CustomerAddPage />
          </Route>
          <Route path="/user">
            <CustomerPage />
          </Route>
          <Route path="/dashboard"></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
