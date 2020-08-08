import React, {useEffect, useState } from "react";
import RecorderFooter from "./RecorderFooter";
import FixedHeader from "./FixedHeader";
import "./styles.scss";
import AudioPlayer from 'react-h5-audio-player';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './src/graphql/queries';
import * as mutations from './src/graphql/mutations';
import * as subscriptions from './src/graphql/subscriptions';
import Media from "react-media";

function AudioListComponent({playUrl, audioData, userid}) {
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
                  //vbid: String(ran)
                  vbaudpath: res,
                  vbuserid: userid,
                  vbviews: 0,
                  //vbdatecreated:awsDate
                };

                 API.graphql(graphqlOperation(mutations.createVoiceblasts, {input: vbUpdate})).then((a)=>{
                     console.log(a);
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
              onPlay={e =>   document.getElementsByClassName('rhap_current-time')[0].style.display= "block"}
          />

     <Button onClick={()=>validateForm()} type="button"> Done </Button>
     </form>
    </div>
  );
}


export default function VoiceBlastMain(props) {
  const [audioList, setAudioList] = useState([]);
  const [newAudioFile, setNewAudioFile] = useState(null);
  const [playUrl, setPlayUrl] = useState(null);
  const [newAudioComponent, setNewAudioComponent] = useState();
  const [userName, setUserName] = useState(props.location.state.username !== ''?props.location.state.username:'');
  const [userid, setUserid] = useState(props.location.state.userid);
  const [vburl, setVburl] = useState(props.location.state.vburl !== ''?props.location.state.vburl:'');
  const [isMobile, setMobile] = useState(false);
  const [mediaQuery, setMediaQuery] = useState("(min-width: 600px) and (max-width: 900px)");
  const [profilePhoto,setprofilePhoto] = useState(props.location.state.profileImg);

  useEffect(() => {
    getAllVoiceBlasts()
    return ()=>{
       if(!window.orientation || !window.screen.orientation) {
           setMobile(true);
        if(isMobile){
           setMediaQuery("(max-width: 599px)");
        }
       }
    }
  },[]);
  
  async function loadVoiceBlasts(){
      const oneUser = await API.graphql(graphqlOperation(queries.getVoiceblasts , { vbuserid: userid}));
      console.log(oneUser);
      
  }

  function updtAudioList(plyUr,mp3b) {
    setNewAudioFile(mp3b);
    setPlayUrl(plyUr);

    //setHideNewAudio(true);
    let newComp = (
               <AudioListComponent 
                 style={{display:'none'}} 
                 audioData = {mp3b} 
                 playUrl = {plyUr}
                 audioList = {audioList}
                 userid = {userid}
                />
             );
             setNewAudioComponent(newComp);
  }
  async function getAllVoiceBlasts(){
       const allVb = await API.graphql(graphqlOperation(queries.getVoiceblasts , { vbuserid: userid}));
        console.log(allVb);
         //vbaudpath vbviews
            let allVab = allVb.data.getVoiceblasts;
             console.log(allVab);
            //allVb.vbaudpath
            //setUserView(allVb.vbviews)
          /*  
           Storage.put(`allVb.vbaudpath`,audioData).then((result) =>{
            console.log(result);
            //saveVoiceBlast(result.key);
           }).catch((err )=> {
            console.log(err)
          });*/
     
  }
   


  return (
       <>
      
        <div style={{padding:5, borderWidth:1, borderColor:'gray'}}>
         <FixedHeader
            profilePhoto ={profilePhoto}
            userName={userName}
            vburl={vburl}
         />
         {newAudioComponent}
         {audioList}
         <RecorderFooter newVoiceBlast={updtAudioList} />
        </div>
    </>
  );
}
// {//<Media query= {mediaQuery}>}
     //  {</Media>}