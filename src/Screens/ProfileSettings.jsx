import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Storage, Auth  } from "aws-amplify";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import * as queries from './../src/graphql/queries';
import * as mutations from './../src/graphql/mutations';
import * as subscriptions from './../src/graphql/subscriptions';

// changing password
// delete account
export default function ProfileSettings() {
       const [show, setShow] = useState(false);
	   const handleCancel = () => setShow(false);
       const handleShow = () => setShow(true);

	   useEffect(() => {
	   

	       return () => {
	    };
	  }, []);

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
	  
       <Button onclick={handleShow}> Delete Your Account </Button>

    </div>
  );
}


//listVbusers