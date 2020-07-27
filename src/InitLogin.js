import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './SignUp';
import Login from './Login';


function InitLogin() {
  return (
    <Router>

     <div  >
      <h1>Voice Blast</h1>
      <button>
         <a href = "/signup"> Sign Up</a>
      </button>
      <p>Already A Creator ?
        <a href = "/login" style={{textDecoration: 'underline'}}> Login Here </a> 
      </p>
     </div>

        <Route path="/" exact component={InitLogin} />
        <Route path = "/login" component = {Login} />
        <Route path = "/signup" component = {SignUp} />
    </Router>
  );
}

export default InitLogin;
