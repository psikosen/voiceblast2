import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Auth  } from "aws-amplify";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import * as mutations from './../src/graphql/mutations';
import {  useHistory  } from "react-router-dom";

// changing password
// delete account
export default function ProfileSettings() {
       const [show, setShow] = useState(false);
       const [oldPassword,setOldpassword] = useState("");
       const [newPassword,setNewPassword] = useState("");
       const [newPasswordRty,setNewPasswordRty] = useState(""); 
       const handleCancel = () => setShow(false);
       const handleShow = () => setShow(true);
       const history = useHistory();

   useEffect(() => { 
     let usrnm = sessionStorage.getItem('username');
     let tmpuserid = sessionStorage.getItem('userId'); 
   
      if(tmpuserid !== "" || tmpuserid !== null){
          document.getElementById('vbmain').onclick = ()=> history.push(`/vbm/${usrnm}`,{userid:tmpuserid});
      }
          document.getElementById('vbfeed').onclick =()=> history.push('/vbf/',{userid:tmpuserid});

      return () => {};
   }, []);
     
  function changePassword(){
      if(oldPassword !== '' && newPassword !== '' && newPasswordRty !== '' && (newPassword === newPasswordRty)){
        let usrid = sessionStorage.getItem('userid'); 
	    Auth.currentAuthenticatedUser() .then(user => {
             return Auth.changePassword(usrid, oldPassword, newPassword);
      }).then(data=> console.log(data)).catch(err => console.log(err));}
  }

  function deleteUserAccount(){
 	      setShow(false);

	      let vbid = sessionStorage.getItem('userId');

	        const deleteVB = {
                  vbid: vbid
                };

                 API.graphql(graphqlOperation(mutations.deleteVbuser, {input: deleteVB})).then((a)=>{
                     console.log(a);
                });
  }

  return (
    <div>
          <Modal show={show} onHide={handleCancel}>
	        <Modal.Header closeButton>
	          <Modal.Title style={{color:'black'}}>Delete Your Account ? :'( </Modal.Title>
	        </Modal.Header>
	        <Modal.Body style={{color:'#873260'}} >Are you sure You Want to Delete Your Account ?</Modal.Body>
	        <Modal.Footer>
	          <Button variant="primary" onClick={handleCancel}>
	            Cancel
	          </Button>
	          <Button variant="danger" onClick={deleteUserAccount}>
	            Yes
	          </Button>
	        </Modal.Footer>
	    </Modal>

	    <div style={{padding:20, margin:30, marginLeft:'20%', 
                     width:'55%',border: '2px solid black', 
                      height:'500px'}}>
        <FormGroup controlId="changePass" >
          <FormLabel style={{width:'30%', margin:'2%', marginLeft:'20%'}}> Old Password</FormLabel >
          <FormControl
            autoFocus
            type="text"
            style={{width:'50%',margin:'2%', marginLeft:'20%'}}
            value={oldPassword}
            onChange={e => setOldpassword(e.target.value)}
          />
        </FormGroup>
	    <FormGroup controlId="changePass" >
          <FormLabel style={{width:'30%', margin:'2%', marginLeft:'20%'}}>  Password</FormLabel >
          <FormControl
            autoFocus
            type="text"
            style={{width:'50%',margin:'2%', marginLeft:'20%'}}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="changePass" >
          <FormLabel style={{width:'30%', margin:'2%', marginLeft:'20%'}}>Reenter Password </FormLabel >
          <FormControl
            autoFocus
            type="text"
            style={{width:'50%', marginLeft:'20%'}}
            value={newPasswordRty}
            onChange={e => setNewPasswordRty(e.target.value)}
          />
        </FormGroup>
        <ul className={"vertical-menu"} style={{width:'20%', margin:'2%', marginLeft:'18%'}} >
         <Button style={{width:'300%'}} onClick={changePassword}>Change Password </Button>
         <Button style={{width:'300%', backgroundColor:'red', marginTop:'18%'}} onClick={handleShow}> Delete Your Account </Button>
       </ul>
     </div>
    </div>
  );
}


//listVbusers
