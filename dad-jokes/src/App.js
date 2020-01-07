import React from "react";
import Login from "./components/Login";
import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <h1>Dad jokes</h1>
      <Route exact path="/" component={Login} />
      <PrivateRoute exact path="/" component={} />
    </div>
  );
}

export default App;
