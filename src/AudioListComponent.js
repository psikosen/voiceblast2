import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './src/graphql/queries';
import * as mutations from './src/graphql/mutations';


export default function AudioListComponent({playUrl, audioData, userid, setNewAudioComponent, getAllVoiceBlasts}) {
  const [voiceBlastTitle, setVoiceBlastTitle] = useState("");
   
    useEffect(()=>{
        document.getElementsByClassName('rhap_volume-controls')[0].style.display = 'none';
        document.getElementsByClassName('rhap_additional-controls')[0].style.display = 'none';
        document.getElementsByClassName('rhap_time rhap_total-time')[0].style.display = 'none';
        document.getElementsByClassName('rhap_current-time')[0].style.display = 'none';
    },[]);

   async function handleSubmit(){

     Storage.put(`${voiceBlastTitle}.mp3`,audioData).then((result) =>{
      console.log(result);
      saveVoiceBlast(result.key);
     }).catch((err )=> {
      console.log(err)
    });
  }
   async function saveVoiceBlast(res){
        const vbUpdate = {
                  vbaudpath: res,
                  vbuserid: userid,
                  vbviews: 0
                };

                 API.graphql(graphqlOperation(mutations.createVoiceblasts, {input: vbUpdate})).then((a)=>{
                     console.log(a);
                     setNewAudioComponent(null);
                     getAllVoiceBlasts();  
                });

                       
  }

  function validateForm() {
    console.log('validated')
     if(voiceBlastTitle.length > 6 && voiceBlastTitle.length < 25){
       handleSubmit();
       return true;
    }
    return false;
  }

  return (
    <div >
     <form >
       <FormGroup controlId="voiceBlastTitle" >
          <FormControl
            autoFocus
            type="text"
            placeholder = "Enter Voice Blast Title"
            value={voiceBlastTitle}
            onChange={e => setVoiceBlastTitle(e.target.value)}
          />
        </FormGroup>

        <AudioPlayer
              showSkipControls = {false}
              showJumpControls = {false}
              showDownloadProgress = {false}
              showFilledProgress = {false}
              src={playUrl}
              onPlay={e => document.getElementsByClassName('rhap_current-time')[0].style.display= "block"}
          />

     <Button onClick={()=>validateForm()} type="button"> Done </Button>
     </form>
    </div>
  );
}
