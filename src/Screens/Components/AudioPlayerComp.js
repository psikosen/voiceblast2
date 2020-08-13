import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import { BsTrash }  from "react-icons/bs";
import {FiShare2} from "react-icons/fi";
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './../../src/graphql/queries';
import * as mutations from './../../src/graphql/mutations';
import * as subscriptions from './../../src/graphql/subscriptions';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AudioPlayerComp({playUrl,playTitle,vbidd, vbviews, getAllVoiceBlasts}) {
	   const [vbid, setVbid] = useState(vbidd);
	   const [vbvw, setVbvw] = useState(vbviews);
       const [show, setShow] = useState(false);

	   const handleCancel = () => setShow(false);
       const handleShow = () => setShow(true);
	   
	   function deleteVb(){
		   Storage.remove(`${playTitle}.mp3`).then((result) =>{
		      console.log(result);

		     }).catch((err )=> {
		      console.log(err)
		    });
	   }

	   function deleteVbData(){
	   	       setShow(false);
		       const deleteVB = {
                  vbid: vbid
                };

                 API.graphql(graphqlOperation(mutations.deleteVoiceblasts, {input: deleteVB})).then((a)=>{
                     console.log(a);
                     deleteVb();
                     getAllVoiceBlasts();
                });
	   }

	   async function newView(){
	   	  var newViews = vbviews;
	   	      console.log(newViews);
	   	        var updatedView =  await API.graphql(graphqlOperation(mutations.updateView, {vbid: vbid, vbviews:newViews } )).then((a)=>{
                     console.log(a);
                     console.log('======');
                     setVbvw(a.data.updateView.vbviews) 
                });
	   	      //console.log(updatedView.updateView.vbviews);
	   	      
	   }

       return (
      <>
        <Modal show={show} onHide={handleCancel}>
	        <Modal.Header closeButton>
	          <Modal.Title style={{color:'black'}}>{playTitle}</Modal.Title>
	        </Modal.Header>
	        <Modal.Body style={{color:'#873260'}} >Are you sure You Want to Delete This Voice Blast ?</Modal.Body>
	        <Modal.Footer>
	          <Button variant="primary" onClick={handleCancel}>
	            Cancel
	          </Button>
	          <Button variant="danger" onClick={deleteVbData}>
	            Yes
	          </Button>
	        </Modal.Footer>
	    </Modal>

       <div title = {vbid}>
        <p>{playTitle}</p>
        <p>{vbvw}</p>
        <AudioPlayer
              showSkipControls = {false}
              showJumpControls = {false}
              showDownloadProgress = {false}
              showFilledProgress = {false}
              src={playUrl}
              onPlay={() => newView()}
          />
        <div>
         <BsTrash onClick={handleShow} />
         <FiShare2 onClick={()=>{}}/>
        </div>
        </div>

	  
        </>
       	)
}

// note to self use modal
