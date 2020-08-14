import React, {useEffect, useState } from "react";
import RecorderFooter from "./RecorderFooter";
import FixedHeader from "./FixedHeader";
import AudioPlayerComp from "./Components/AudioPlayerComp";
import AudioListComponent from "./Components/AudioListComponent";
import "./Css/styles.scss";
import AudioPlayer from 'react-h5-audio-player';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './../src/graphql/queries';
import * as mutations from './../src/graphql/mutations';
import * as subscriptions from './../src/graphql/subscriptions';
import Media from "react-media";
import logo from './Images/vlogo.png';


export default function VoiceBlastMain(props) {
  const [audioList, setAudioList] = useState([]);
  const [audioListData, setAudioListData] = useState([]);
  const [newAudioFile, setNewAudioFile] = useState(null);
  const [playUrl, setPlayUrl] = useState(null);
  const [newAudioComponent, setNewAudioComponent] = useState();
  const [isMobile, setMobile] = useState(false);
  const [mediaQuery, setMediaQuery] = useState("(min-width: 600px) and (max-width: 900px)");
  
  const [profilePhoto,setprofilePhoto] = useState("");
  const [userName, setUserName] = useState("");
  const [userid, setUserid] = useState(props.location.state === undefined ? "" : props.location.state.usrid);
  const [vburl, setVburl] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState(""); 
  const [vbbio, setVbbio] = useState("");
  const [error, setError] = useState("");   

  useEffect(() => {
    // reload not working properly the page returns no data
    getUser();
    getAllVoiceBlasts();

    return ()=>{
       if(!window.orientation || !window.screen.orientation) {
           setMobile(false);
       
       }else{
        setMobile(true);
         if(isMobile){
           setMediaQuery("(max-width: 599px)");
        }
       }
    }
  },[]);
  
     async function getUser(){ 
      
      
      if(userid  === ""){
          var currentUsrId = sessionStorage.getItem('userId');
          loadUserData(currentUsrId);
      }else{
          loadUserData(userid);
      }

      async function loadUserData(usrid){
        if(usrid !== null){
        const oneUser = await API.graphql(graphqlOperation(queries.getVbuser , { vbuid: usrid}));
       
        console.log(oneUser);

        if(oneUser.data.getVbuser !== null){
          let usrObj = oneUser.data.getVbuser;
          let usrnm = usrObj.vbuusername;
          let usrurl = usrObj.vbuurl;
          let usrfn = usrObj.vbufirstname;
          let usrln = usrObj.vbulastname;
          let usrimg = usrObj.vbuimg;
          let usrbio = usrObj.vbbio;
          
          setUserid(usrObj.vbuid);
          
          // fix later 
          window.history.pushState('vbm/', ' ', `/vbm/${usrObj.vbuusername}`);

          sessionStorage.setItem('userId', usrObj.vbuid);

          if(usrnm){
             setUserName(usrnm);  
          }
          
          if(usrurl){ 
             setVburl(usrurl);
          }

          if(usrfn){
             setfirstName(usrfn);
          }

          if(usrln){
            setlastName(usrln[0]);
          }

          if(usrbio){
            setVbbio(vbbio);
          }

          if(usrimg){
           Storage.get(usrimg)
              .then(result =>{
                console.log(result);
                setprofilePhoto(result);
                
              }).catch(err => console.log(err));
          }
        } 
      }
    }
   }

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
                 getAllVoiceBlasts = {getAllVoiceBlasts}
                />
             );
        setNewAudioComponent(newComp);
  }

  async function getAllVoiceBlasts(){
    setAudioList([]);
       const allVb = await API.graphql(graphqlOperation(queries.listVoiceblasts , { vbuserid: userid}));
        console.log(allVb);
         //vbaudpath vbviews
            let allVab = allVb.data.listVoiceblasts.items;
             console.log(allVab);
             setAudioListData(allVab);
            let sortedAudioList = allVab.sort(function(a,b){
                      console.log(b);
                      return b.vbdatecreated.localeCompare(a.vbdatecreated);
                 });

            let finishedMap = sortedAudioList.map((a)=>{
                return Storage.get(a.vbaudpath).then(
                  result => result.split('?')[0]).catch(err => console.log(err));

             });
 
            Promise.all(finishedMap).then(function(results) {
                console.log(results);
                 if(results.length > 0 ){ //{"http://voiceblastvb3181216-dev.s3.amazonaws.com/public/" + a.vbaudpath}
                    var newAudioList = [];

                    for(var i = 0 ; i < results.length;i++){
                      let aud = <li key = {`${i}o`}><AudioPlayerComp key = {`${i}a`}
                                                     playTitle = {allVab[i].vbaudpath !== null?allVab[i].vbaudpath.split('.mp3'):''} 
                                                     playUrl = {`${results[i]}` } 
                                                     vbidd = {allVab[i].vbid} 
                                                     vbviews = {allVab[i].vbviews}
                                                     getAllVoiceBlasts = {getAllVoiceBlasts}
                                                     > 
                                    </AudioPlayerComp>
                                </li>;
                          newAudioList.push(aud); 
                    } 
                  
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
                           userName={`${firstName} ${lastName}.`}
                           vburl={vburl}
                           vbbio={vbbio}
                       />

         <div style = {{marginTop:'10%', height: '100%', overflowY: 'scroll' }}>
           {newAudioComponent}
         </div> 
         <ul style={{width:'100%', top:'80px', position:'relative'}}>
           {audioList.length === 0?<img src={logo}/>:audioList}
         </ul>
         <RecorderFooter newVoiceBlast={updtAudioList} />
        </div>
       </Media>
    </>
  );
}
// {//<Media query= {mediaQuery}>}
     //  {</Media>}
     // if no voice blasts
     // display graphic with instructions
     // infinite scroll 
     // only show 10