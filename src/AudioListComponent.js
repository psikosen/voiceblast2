import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
//import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './src/graphql/queries';
import * as mutations from './src/graphql/mutations';

 function AudioListComponent({playUrl, audioData}) {
  const [voiceBlastTitle, setVoiceBlastTitle] = useState("");
  

  
  async function handleSubmit(){
      event.preventDefault();
     Storage.put(`${voiceBlastTitle}.mp3`,audioData).then((result) =>{
      console.log(result);
     }
    ).catch(err => console.log(err));

  }
 
  function validateForm() {
    console.log('validated')
     if(voiceBlastTitle.length > 0 && voiceBlastTitle.length < 25){
       return true;
    }
    return false;
  }

  return (
    <div >
     <form onSubmit={handleSubmit}>
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
              //onPlay={e => console.log("onPlay")}
          />

     <Button disabled={!validateForm()} type="button"> Done </Button>
     </form>
    </div>
  );
}
