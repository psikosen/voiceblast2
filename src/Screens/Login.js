import React, { useState } from "react";
import { Button, FormGroup, FormCheck, FormControl, FormLabel  } from "react-bootstrap";
import "./Css/Login.css";
import {AiOutlineEye} from "react-icons/ai";
import {AiFillEyeInvisible} from "react-icons/ai";
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import * as queries from './../src/graphql/queries';
import * as mutations from './../src/graphql/mutations';
import * as subscriptions from './../src/graphql/subscriptions';
import {useHistory} from "react-router-dom";


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
    

  function showOrHidePasswordText(){
     if(!showPassword){
        setPasswordType("text");
        setShowPassword(true);
     }else{
        setPasswordType("password");
        setShowPassword(false);
     }
        
   } 

  async function getUser(usrid){
     const oneUser = await API.graphql(graphqlOperation(queries.getVbuser , { vbuid: usrid}));
     
     if(oneUser.data.getVbuser !== null){
       let usrnm = oneUser.data.getVbuser.vbuusername;

       await updateLogin(usrid);
       await handleNavigation(usrid , usrnm);
     }  
  }

  async function updateLogin(usrid){
     var awsDate = new Date().toISOString();
     console.log('===============');

     API.graphql(graphqlOperation(mutations.updateLastLogin, {input: {vbuid: usrid, vbulastlogin: awsDate}})).then((a)=>{
                     console.log(a);
     console.log('===============');
                });
     
      
  }  

  async function signIn() {
    try {
      const user = await Auth.signIn(email, password);
      //console.log(user.username);
      await getUser(user.username);
      
    } catch (error) {
        //console.log('error signing in', error);
        setError(error.message);
    }
  }

  function validateEmail(eml){
     const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
     return re.test(eml);
  }
  
  // add an email regex here to validate
  function validateForm() {

    if(!validateEmail(email)){
        return false;
    }
    
    if((email.length > 9 && email.length < 40) && (password.length >= 8 && password.length <= 25)) {
        return true;
    }

    setError('Invalid email or password length');

    return false;
  }

  function handleNavigation(usrid, username){
   
    history.push(`/vbm/${username}` ,{userid: usrid});

  }

  function handleSubmit(e) {
    e.preventDefault();
    signIn(email,password);
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>

        <div style={{color:'red', fontSize:'11px'}}>{error}</div>
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

         <FormGroup controlId="rememberPassword">
          <FormCheck type="checkbox" label="Remember Password" />
        </FormGroup>

        <p><a href="/forgottenPass">Forgotten Password ?</a></p>
        <Button onClick={()=>validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

// store cookie passwords