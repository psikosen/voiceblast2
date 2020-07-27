
import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import "./Login.css";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRty, setPasswordRty] = useState("");
/*  useEffect(()=>{
      document.getElementById('mainMenu').style.display="none";

  },[]);*/
 
  function validateForm() {
    return email.length > 0 && password.length > 0 && password === passwordRty;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
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
    </div>
  );
}

