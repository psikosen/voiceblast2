import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import {AiOutlineEye} from "react-icons/ai";
import {AiFillEyeInvisible} from "react-icons/ai";
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
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
 
  const history = useHistory();
/*  useEffect(()=>{
      document.getElementById('mainMenu').style.display="none";

  },[]);*/
   function showOrHidePasswordText(){
     if(!showPassword){
        setPasswordType("text");
        setShowPassword(true);
     }else{
        setPasswordType("password");
        setShowPassword(false);
     }
        
   } 

  function validateForm() {
    if(validateEmail){
  	 if(email.length > 0 && password.length > 0 && password === passwordRty){
  	 	 return true;
     }
    }
    return false;
  }
 
  async function createUser(usrid,username){
   	var awsDate = new Date().toISOString();

        const profileCreated = {
         vbuid:usrid,
         vbuemail: email,
         vbulastlogin:awsDate,
         vbusignupdate: awsDate
       };
        await API.graphql(graphqlOperation(mutations.createVbuser, {input: profileCreated})).then((a)=>{
            console.log(a);
            history.push("/confimationCode", {usrid: usrid, username:username})
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
        	await createUser(user.userSub,username); 
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
          <FormLabel>
             Password
           <span onClick={showOrHidePasswordText}>  
             {showPassword ?<AiFillEyeInvisible/> :<AiOutlineEye />}
           </span>
          </FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={passwordType}
          />
        </FormGroup>

        <FormGroup controlId="passwordRty" >
          <FormLabel>Password Re-enter</FormLabel>
          <FormControl
            value={passwordRty}
            onChange={e => setPasswordRty(e.target.value)}
            type= {passwordType}
          />
        </FormGroup>

        <Button block  disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>

  );
}

