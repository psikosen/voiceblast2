import React, { useState }  from 'react';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import './App.css';
import "./styles.scss";
import {  useHistory  } from "react-router-dom";

export default function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    if(validateForm())
      //await sendEmail(email);
   return false;
  }
 
 function validateForm() {
  	 if(email.length > 0 && email.length <= 35){
  	 	 return true;
  	}
    return false;
  }

  return (
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

        <Button onClick={()=>validateForm()} type="submit">
          Submit Email
        </Button>
      </form>
  );
}