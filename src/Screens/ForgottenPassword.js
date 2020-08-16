import React, { useState }  from 'react';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import {AiOutlineEye} from "react-icons/ai";
import {AiFillEyeInvisible} from "react-icons/ai";
import "./Css/styles.scss";
import Modal from "react-bootstrap/Modal"; 
import {  useHistory  } from "react-router-dom";
import Amplify, { Auth,  } from 'aws-amplify';

export default function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
 
  const [confirmationCode, setConfirmationCode] = useState("");
  const [new_password, setNew_password] = useState("");
  const [codeBeingSubmited, setCodeBeingSubmited] = useState(true);
  

  const handleCancel = () => setShow(false);
  const handleShow = () => setShow(true);

  function showOrHidePasswordText(){
     if(!showPassword){
        setPasswordType("text");
        setShowPassword(true);
     }else{
        setPasswordType("password");
        setShowPassword(false);
     }
        
   } 

  async function submitCode(event) { 
      Auth.forgotPassword(email)
      .then(data => console.log(data))
      .catch(err => setError(err));
  }

  function changePassword(){ 
    if(email.length < 10 && confirmationCode !== "" && new_password !== ""){
       return false;
    }

    //Collect confirmation code and new password, then
     Auth.forgotPasswordSubmit(email, confirmationCode, new_password).then(data => {
          console.log(data);
          handleCancel();
      }).catch(err => {setError(err);}); 

      
      return true;
  }

  function validateForm() {
  	 if(email.length > 0 && email.length <= 35){
       submitCode();
       handleShow();
  	 	 return true;
  	}
    return false;
  }

  return (
    <>
     <Modal show={show} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title style={{color:'black'}}> Code Verification</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{color:'#873260'}} >
          <div style={{color:'red'}}>{error}</div>
         <FormGroup controlId="confirmation" >
                <FormLabel >Confirmation Code</FormLabel >
                 <FormControl
                  autoFocus
                  type="text"
                  value={confirmationCode}
                  onChange={e => setConfirmationCode(e.target.value)}
                />
          </FormGroup>
          <FormGroup controlId="new_password" >
                        <FormLabel>
                          
                           <div onClick ={showOrHidePasswordText}>
                            New Password
                           {showPassword ?<AiFillEyeInvisible/> :<AiOutlineEye />}
                           </div>
                        </FormLabel>
                         <FormControl
                          autoFocus
                          type={passwordType}
                          value={new_password}
                          onChange={e => setNew_password(e.target.value)}
                        />
          </FormGroup> 

      </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" >
              Cancel
            </Button>
            <Button variant="danger" onClick = {()=>changePassword()}>
              Change Password
            </Button>
          </Modal.Footer>
      </Modal>

        <div style={{color:'red'}}>{error}</div>
        <h2 style={{textAlign:'center', padding:20}}> Forgot Password ?</h2>
        <div 
             style={{padding:20, margin:30, marginLeft:'20%', 
                     width:'60%',border: '2px solid black', 
                      height:'90%'}} > 
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
      </div>
   </>
  );
}