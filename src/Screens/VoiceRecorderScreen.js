import React, { useState }  from 'react';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import AudioListComponent from "./Components/AudioListComponent";
import {useHistory} from "react-router-dom";
import Amplify, { Auth,  } from 'aws-amplify';
import RecorderFooter from "./RecorderFooter";

export default function VoiceRecorderScreen(props) {
  const history = useHistory();
  const [userName, setUserName] = useState(props.location.state === undefined ? "": 
                                           props.location.state.userName);
  const [userid, setUserid] = useState(props.location.state === undefined ? "": 
                                       props.location.state.usrid);
  const [newAudioComponent, setNewAudioComponent] = useState();
  const [newAudioFile, setNewAudioFile] = useState(null);
  const [playUrl, setPlayUrl] = useState(null);
   
    async function handleSubmit(event) {
     return false;
    }

    function updtAudioList(plyUr,mp3b) {
      //setNewAudioFile(mp3b);
      setPlayUrl(plyUr);

      //setHideNewAudio(true);
      let newComp = (
                 <AudioListComponent  
                   audioData = {mp3b} 
                   playUrl = {plyUr}
                   userid = {userid}
                   setNewAudioComponent = {setNewAudioComponent}
                  />
               );
        setNewAudioComponent(newComp);
        toggle('rhap_time rhap_current-time','none');
    }
 
    function toggle(className, displayState){
         var elements = document.getElementsByClassName(className)
             for (var i = 0; i < elements.length; i++){
                  elements[i].style.display = displayState;
                  }
    }

   function navigateBackToMain(){
         history.push(`/vbm/${userName}`)
   }

   function validateForm() {

      return false;
   }

  return (
      <div>
       <div style = {{marginTop:'10%', height: '100%', overflowY: 'scroll' }}>
           {newAudioComponent}
       </div>
 
        <RecorderFooter newVoiceBlast={updtAudioList} />
      </div>
  );
}