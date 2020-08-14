import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import { BsTrash }  from "react-icons/bs";
import {FiShare2} from "react-icons/fi";
import {TiEdit} from "react-icons/ti";
import {BsThreeDots} from "react-icons/bs";
import { API, graphqlOperation, Storage  } from "aws-amplify";
import {FormGroup, FormControl, FormLabel  } from "react-bootstrap"; 
import * as queries from './../../src/graphql/queries';
import * as mutations from './../../src/graphql/mutations';
import * as subscriptions from './../../src/graphql/subscriptions';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShareSocialListButton from "./ShareSocialListButton";
import * as ReactBootstrap from 'react-bootstrap';

export default function AudioPlayerComp({playUrl,playTitle,playPath,vbidd,vbusrid, vbviews, getAllVoiceBlasts}) {
	   const [vbid, setVbid] = useState(vbidd);
	   const [vbvw, setVbvw] = useState(vbviews);
       const [show, setShow] = useState(false);
       const [currentPlayTitle,setCurrentPlayTitle] = useState(playTitle);
       const [originalPlayTitle,] = useState(playTitle);
       
       const [editingTitle, isEditingTitle] = useState(false);
       const [displayAdditionOptions, setDisplayAdditionOptions] = useState(null);
       const [displaying, IsDisplaying] = useState(false);
	   const handleCancel = () => setShow(false);
       const handleShow = () => {setDisplayAdditionOptions(null);setShow(true);}
	   
	  function editTitle(){
	  	  setDisplayAdditionOptions(null);
	  	  isEditingTitle(true);
	   
	  }

	  function updateVoiceBlastTitle(){ 
	  		const editVBTitle = {
                 vbid: vbid,
                 vbtitle: currentPlayTitle
            };

            console.log('Entering vb');

            API.graphql(graphqlOperation(mutations.updateVoiceblastsTitle, {input: editVBTitle})).then((a)=>{
                console.log(a);
                setDisplayAdditionOptions(null);
	  	        IsDisplaying(false);
	  	        isEditingTitle(false);
	  	        setCurrentPlayTitle(currentPlayTitle);
            });	
	  }

	  function showAdditionalItems(){
	  	if(!displaying){
           IsDisplaying(true);
           setDisplayAdditionOptions(
	  		<div>
	  	   	  <TiEdit  onClick = { editTitle } />
	  		  <BsTrash onClick=  { handleShow } />
	  		</div>
	  		);
	  	}else{
	  	    setDisplayAdditionOptions(null);
	  	    IsDisplaying(false);
	  	}
	  }

	   function deleteVb(){
		   Storage.remove(`${playPath}`).then((result) =>{
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
        {editingTitle ?
	         (<div>
	         <FormGroup controlId="playtitle" >
	          <FormControl
	            autoFocus
	            type="test"
	            value={currentPlayTitle}
	            onChange={e => setCurrentPlayTitle(e.target.value)}
	          />
	          </FormGroup>
	          <Button onClick={updateVoiceBlastTitle}> Edit</Button>
	          </div>
	         )
	        :
	       <p>{currentPlayTitle}</p>
          }
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
         <BsThreeDots onClick={showAdditionalItems} />
          {displayAdditionOptions}

            <ReactBootstrap.OverlayTrigger 
                  trigger="click" 
                  placement="bottom"
                  path ={"google.com"}
                  overlay={<ShareSocialListButton/>} containerPadding={2}>
            <FiShare2 />

          </ReactBootstrap.OverlayTrigger>
         </div>
        </div>
      
	  
        </>
       	)
}

// note to self use modal
