import React from 'react';
import './App.css';
import UserSignUp from "./components/UserSignUp";
import Navigation from "./components/Navigation";
import JokesCardDisplay from "./components/JokesCardDisplay";
import {Route} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import Login from "./components/Login";
import SecurePath from "./components/PrivateRoute";

function App() {
  return (
   <Router>
    <div>
      <Navigation />
      <Route exact path="/" component={JokesCardDisplay} />
      <Route exact path="/signup" component={UserSignUp} />
      <Route exact path="/login" component={Login} />
    </div>
    </Router>
  );
}
    
export default App;
