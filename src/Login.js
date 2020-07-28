import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import "./Login.css";
import Amplify, { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Route, useHistory} from "react-router-dom";
import CreateProfile from './CreateProfile';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
/*  useEffect(()=>{
      document.getElementById('mainMenu').style.display="none";

  },[]);*/
  async function signIn() {
    try {
        //const user = await Auth.signIn(email, password);
       handleNav();
    } catch (error) {
        console.log('error signing in', error);
    }
  }

  function validateForm() {
    if( email.length > 0 && password.length > 6){
        signIn(email,password);
        return true;
    }

    return false;
  }
  function handleNav(){
      history.push('/createprofile');
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (

    <Router>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" >
          <FormLabel >Email</FormLabel >
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" >
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
         
          Login

        </Button>
      </form>
    </div>

      <Route path = "/crp" component = {CreateProfile} />
    </Router>
  );
}