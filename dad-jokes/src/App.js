import React from 'react';
import './App.css';
import UserSignUp from "./components/UserSignUp";
import Navigation from "./components/Navigation"
import {Route} from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <Route exact path="/signup" component={UserSignUp} />
    </div>
  );
}
    
export default App;
