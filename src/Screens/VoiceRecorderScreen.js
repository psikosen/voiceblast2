import React, { useState, useEffect }  from 'react';
import AudioListComponent from "./Components/AudioListComponent";
import {useHistory} from "react-router-dom";
import RecorderFooter from "./RecorderFooter";

export default function VoiceRecorderScreen(props) {
  const history = useHistory();
  const [userName,] = useState(props.location.state === undefined ? "": 
                                           props.location.state.userName);
  const [userid,] = useState(props.location.state === undefined ? "": 
                                       props.location.state.usrid);
  const [newAudioComponent, setNewAudioComponent] = useState();
  const [usrUrl, ] = useState(props.location.state === undefined ? "": 
                                       props.location.state.usrurl);
  const [fullName, ] = useState(props.location.state === undefined ? "": 
                                       props.location.state.fullName);
  const [usrbio, ] = useState(props.location.state === undefined ? "": 
                                       props.location.state.usrbio);
  const [usrimg, ] = useState(props.location.state === undefined ? "": 
                                       props.location.state.usrimg);
    useEffect(()=>{
     let usrnm     = sessionStorage.getItem('username');
     let tmpuserid = sessionStorage.getItem('userId'); 
   
      if(tmpuserid !== "" || tmpuserid !== null){
          document.getElementById('vbmain').onclick = ()=> history.push(`/vbm/${usrnm}`,{userid:tmpuserid});
      }
          document.getElementById('vbfeed').onclick =()=> history.push('/vbf/',{userid:tmpuserid});

    },[]);

    function updtAudioList(plyUr,mp3b) {
      //setNewAudioFile(mp3b);
      //setHideNewAudio(true);
      let newComp = (
                 <AudioListComponent  
                   audioData = {mp3b} 
                   playUrl = {plyUr}
                   userid = {userid}
                   setNewAudioComponent = {setNewAudioComponent}
                   navigateBackToMain = {navigateBackToMain}
                   usrObj = {
                            {
                            vbuurl:usrUrl,
                            vbuusername:userName,
                            vbubio:usrbio,
                            vbufullName:fullName,
                            vbuimg:usrimg  
                            }
                          }
                  />
               );
        setNewAudioComponent(null);
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
         history.push(`/vbm/${userName}`, {userid:userid})
   }
 
  return (
      <div>
       <div style = {{marginTop:'10%', height: '100%', overflowY: 'scroll' }}>
           {newAudioComponent}
       </div>
 
        <RecorderFooter newVoiceBlast={updtAudioList} topPost = {'45%'} 
            />
      </div>
  );
}