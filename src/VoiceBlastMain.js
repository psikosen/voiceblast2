import React, {useEffect, useState } from "react";
import RecorderFooter from "./RecorderFooter";
import FixedHeader from "./FixedHeader";
import AudioPlayerComp from "./AudioPlayerComp";
import "./styles.scss";
import AudioPlayer from 'react-h5-audio-player';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './src/graphql/queries';
import * as mutations from './src/graphql/mutations';
import * as subscriptions from './src/graphql/subscriptions';
import Media from "react-media";

function AudioListComponent({playUrl, audioData, userid, setNewAudioComponent}) {
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



export default function VoiceBlastMain(props) {
  const [audioList, setAudioList] = useState([]);
  const [audioListData, setAudioListData] = useState([]);
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
    getAllVoiceBlasts();

    return ()=>{

     
       if(!window.orientation || !window.screen.orientation) {
           setMobile(true);
        if(isMobile){
           setMediaQuery("(max-width: 599px)");
        }
       }
      
    }
  },[]);
  
 

  function updtAudioList(plyUr,mp3b) {
    setNewAudioFile(mp3b);
    setPlayUrl(plyUr);

    //setHideNewAudio(true);
    let newComp = (
               <AudioListComponent  
                 audioData = {mp3b} 
                 playUrl = {plyUr}
                 audioList = {audioList}
                 userid = {userid}
                 setNewAudioComponent = {setNewAudioComponent}
                />
             );
        setNewAudioComponent(newComp);
  }

  async function getAllVoiceBlasts(){
       const allVb = await API.graphql(graphqlOperation(queries.listVoiceblasts , { vbuserid: userid}));
        console.log(allVb);
         //vbaudpath vbviews
            let allVab = allVb.data.listVoiceblasts.items;
             console.log(allVab);
             setAudioListData(allVab);

            let finishedMap = allVab.map((a)=>{
                return Storage.get(a.vbaudpath).then(
                  result => result.split('?')[0]).catch(err => console.log(err));

             });
 
            Promise.all(finishedMap).then(function(results) {
                console.log(results);
                 if(results.length > 0 ){ //{"http://voiceblastvb3181216-dev.s3.amazonaws.com/public/" + a.vbaudpath}
                    var newAudioList = [];

                    for(var i = 0 ; i < results.length;i++){
                      let aud = <ol><AudioPlayerComp key = {`${i}a`}
                                                     playTitle = {allVab[i].vbaudpath.split('.mp3')} 
                                                     playUrl = {`${results[i]}` } 
                                                     vbidd = {allVab[i].vbid} 
                                                     vbviews = {allVab[i].vbviews}
                                                     getAllVoiceBlasts = {getAllVoiceBlasts}
                                                     > 
                                    </AudioPlayerComp>
                                </ol>;
                          newAudioList.push(aud); 
                    } 
                    //let m = results.map((a)=> <audio controls src = {`${results}` } type={"audio/mp3"}> type={"audio/mp3"} </audio>);
                    //console.log(newAudioList);
                    setAudioList(newAudioList);
                    toggle('rhap_button-clear rhap_repeat-button','none');
                    toggle('rhap_button-clear rhap_volume-button','none');
                    toggle('rhap_time rhap_total-time','none');
                  }  
            })
          
  }
      function toggle(className, displayState){
         var elements = document.getElementsByClassName(className)
             for (var i = 0; i < elements.length; i++){
                  elements[i].style.display = displayState;
                  }
              }


  return (
       <>
      <Media query={{}}> 
        <div style={{padding:5, borderColor:'gray'}}>
         <FixedHeader
            profilePhoto ={profilePhoto}
            userName={userName}
            vburl={vburl}
         />
         <div style = {{marginTop:'10%', height: '100%', overflowY: 'scroll' }}>
           {newAudioComponent}
         </div> 
         <div style={{width:'80%'}}>
         {audioList}
         </div>
         <RecorderFooter newVoiceBlast={updtAudioList} />
        </div>
       </Media>
    </>
  );
}
// {//<Media query= {mediaQuery}>}
     //  {</Media>}