import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import "./Login.css";
import Amplify, { Auth } from 'aws-amplify';
import {useHistory} from "react-router-dom";
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");
  
  /*  useEffect(()=>{
      document.getElementById('mainMenu').style.display="none";
 
  },[]);*/

  async function signIn() {
    try {
      const user = await Auth.signIn(email, password);
      console.log(user.username);
      await handleNav(user.username);
    } catch (error) {
        console.log('error signing in', error);
        setError(error.message);
    }
  }

  function validateForm() {
    if(email.length > 0 && password.length >= 8){
        return true;
    }

    setError('Invalid email or password length');
    return false;
  }
  function handleNav(username){
      history.push('/crp',{usrid: username});
  }

  function handleSubmit(event) {
    event.preventDefault();
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
        <p><a href="/forgottenPass">Forgotten Password</a></p>
        <Button onClick={()=>validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}