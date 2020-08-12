import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import "./Login.css";
import Amplify, { Auth } from 'aws-amplify';
import {useHistory} from "react-router-dom";


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  

  async function signIn() {
    try {
      const user = await Auth.signIn(email, password);
      //console.log(user.username);
      await handleNavigation(user.username);
    } catch (error) {
        //console.log('error signing in', error);
        setError(error.message);
    }
  }
  // add an email regex here to validate
  function validateForm() {
    if((email.length > 9 && email.length < 40) && (password.length >= 8 && password.length <= 25)) {
        return true;
    }

    setError('Invalid email or password length');
    return false;
  }

  function handleNavigation(username){
    history.push('/crp',{usrid: username});
  }

  function handleSubmit(e) {
    e.preventDefault();
    signIn(email,password);
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>

        <div style={{color:'red'}}>{error}</div>
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
        <p><a href="/forgottenPass">Forgotten Password ?</a></p>
        <Button onClick={()=>validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}