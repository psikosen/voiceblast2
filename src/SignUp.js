
import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import "./Login.css";
import CreateProfile from './CreateProfile';
import Amplify, { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Route, useHistory  } from "react-router-dom";


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRty, setPasswordRty] = useState("");
  const history = useHistory();
/*  useEffect(()=>{
      document.getElementById('mainMenu').style.display="none";

  },[]);*/
 
  async function validateForm() {
  	 if( email.length > 0 && password.length > 0 && password === passwordRty){
  	 	 await signUpInit(email,password);
  	     return true;
  	}

    return false;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  async function signUpInit(username,password) {
    try {
        const user = await Auth.signUp({
            username,
            password,
            /*attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }*/
        });
        console.log({ user });
        history.push("/createProfile")
    } catch (error) {
        console.log('error signing up:', error);
    }
 }

  return (
  	<Router>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel >Email</FormLabel >
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>

        <FormGroup controlId="passwordRty" bsSize="large">
          <FormLabel>Password Re-enter</FormLabel>
          <FormControl
            value={passwordRty}
            onChange={e => setPasswordRty(e.target.value)}
            type="password"
          />
        </FormGroup>

        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
       <Route path = "/createProfile" component = {CreateProfile} />
    </div>
    </Router>
  );
}

