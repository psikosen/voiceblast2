import React from 'react';
import { BrowserRouter as Router, Route,  } from "react-router-dom";
import SignUp from './SignUp';
import Login from './Login';
import CreateProfile from './CreateProfile';
import { AmplifySignOut } from '@aws-amplify/ui-react';

function InitLogin() {
  return (
    <Router>
     <AmplifySignOut />
     <div>
      <h1>Voice Blast</h1>
      <button>
         <a href = "/signup"> Sign Up</a>
      </button>
      <p>Already A Creator ?
        <a href = "/login" style={{textDecoration: 'underline'}}> Login Here </a> 
      </p>
      <p> <a href = "/crp" style={{textDecoration: 'underline'}}>Create Profile </a> </p>
     </div>
       <Route path = "/login" component = {Login} />
       <Route path = "/signup" component = {SignUp} />
       <Route path = "/crp" component = {CreateProfile} />
    </Router>
  );
}

export default InitLogin;

//
//        