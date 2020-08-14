
import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
//import * as queries from './src/graphql/queries';
import * as mutations from './../src/graphql/mutations';
//import * as subscriptions from './src/graphql/subscriptions';
import {  useHistory  } from "react-router-dom";


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRty, setPasswordRty] = useState("");
  const [error, setError] = useState('');
  const history = useHistory();
/*  useEffect(()=>{
      document.getElementById('mainMenu').style.display="none";

  },[]);*/
 
  function validateForm() {
    if(validateEmail){
  	 if(email.length > 0 && password.length > 0 && password === passwordRty){
  	 	 return true;
     }
    }
    return false;
  }
 
  async function createUser(usrid){
   	var awsDate = new Date().toISOString();

        const profileCreated = {
         vbuid:usrid,
         vbuemail: email,
         vbulastlogin:awsDate,
         vbusignupdate: awsDate
       };
        await API.graphql(graphqlOperation(mutations.createVbuser, {input: profileCreated})).then((a)=>{
            console.log(a);
        });
   }

  async function handleSubmit(event) {
    event.preventDefault();
    if(validateForm())
      await signUp(email,password);
  
   return false;
  }

  function validateEmail(eml){
     const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
     return re.test(eml);
  }

  async function signUp(username,password) {
    try {
        const user = await Auth.signUp({
            username,
            password,
            attributes: {
                email         
            }
        });
        console.log(user);
        if(user.user !== null){
        	await createUser(user.userSub);
          await history.push("/crp",{usrid: user.userSub});
        }
    } catch (error) {
        console.log('error signing up:', error);
        setError(error.message);
    }
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

        <FormGroup controlId="passwordRty" >
          <FormLabel>Password Re-enter</FormLabel>
          <FormControl
            value={passwordRty}
            onChange={e => setPasswordRty(e.target.value)}
            type="password"
          />
        </FormGroup>

        <Button block  disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>

  );
}

