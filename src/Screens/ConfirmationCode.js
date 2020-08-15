import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import {  useHistory  } from "react-router-dom";

export default function ConfirmationCode(props){
   const [confirmationCode, setConfirmationCode] = useState("");
   const [userName,setUserName] = useState(props.location.state.username);
   const [userID, setUserID] = useState(props.location.state.usrid);
   const [error, setError] = useState("");
   const history = useHistory();

 

   async function confirmCode() {
    try {
      await Auth.confirmSignUp(userName, confirmationCode);
      await history.push("/crp",{usrid: userID});
    } catch (error) {
        console.log('error confirming sign up', error);
    }
   }

   function validateForm(){
   	 if(confirmationCode.length < 6){
   	 	setError("This Cannot Be Less than 5 Characters");
   	 	return false;
   	 }
   	  confirmCode();
   	  return true
   }

   return (
   	 <div>
     <form  >
        <div style={{color:'red'}}>{error}</div>
        <FormGroup controlId="confirmationCode" >
          <FormLabel >Confirmation Code</FormLabel >
          <FormControl
            autoFocus
            type="text"
            value={confirmationCode}
            onChange={e => setConfirmationCode(e.target.value)}
          />
        </FormGroup>
        <Button block onClick={validateForm} type="submit">
          Submit
        </Button>
      </form>
      </div>
   );
}