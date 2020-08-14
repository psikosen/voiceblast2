import React, { useState, useEffect } from "react";
import { Button  } from "react-bootstrap";
import {useHistory} from "react-router-dom";
import FixedHeader from "./FixedHeader";
import AudioPlayerComp from "./Components/AudioPlayerComp";
import AudioPlayer from 'react-h5-audio-player';
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './../src/graphql/queries';
import * as mutations from './../src/graphql/mutations';
import * as subscriptions from './../src/graphql/subscriptions';
import Media from "react-media";

export default function VoiceDisplayIndividualUser(props) {
  const [audioList, setAudioList] = useState("");
  const [userid, setUserId] = useState(window.location.pathname.split(':'));
  const [AudioListData, setAudioListData] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState('');
  const [vburl, setVburl] = useState('');
  const [profilePhoto,setprofileImg] = useState('');
  const history = useHistory();

  useEffect(()=>{
        getUser();
        return ()=>{console.log(userid)}
   },[userid]);
    
  async function getUser(){
      if(userid !== null){
        const oneUser = await API.graphql(graphqlOperation(queries.getVbuser , { vbuid: userid}));
       
        console.log(oneUser);
       
        if(oneUser.data.getVbuser !== null){

          let usrObj = oneUser.data.getVbuser;
          let usrnm = usrObj.vbuusername;
          let usrurl = usrObj.vbuurl;
          let usrimg = usrObj.vbuimg;
          
          setUserId(usrObj.vbuid);

          if(usrnm){
             setUserName(usrnm);  
          }
          
          if(usrurl){ 
             setVburl(usrurl);
          }
 

          if(usrimg){
           Storage.get(usrimg).then(result =>{
                console.log(result);
                setprofileImg(result);
              }).catch(err => console.log(err));
          }
          
          getAllVoiceBlasts();

        }else{
        }
      }
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
                      let aud = <ol><AudioPlayerComp key = {`${i}a`}
                                                     playTitle = {allVab[i].vbaudpath !== null?allVab[i].vbaudpath.split('.mp3'):''} 
                                                     playUrl = {`${results[i]}` } 
                                                     vbidd = {allVab[i].vbid} 
                                                     vbviews = {allVab[i].vbviews}
                                                     getAllVoiceBlasts = {getAllVoiceBlasts}
                                                     > 
                                    </AudioPlayerComp>
                                </ol>;
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
    <div>
       <div>{error}</div>
        <FixedHeader
            profilePhoto ={profilePhoto}
            userName={userName}
            vburl={vburl}
        />
       {audioList}
    </div>
  );
}

// more blasts from this creator
// show atleast 3 of their latest blasts
// Url Link to page highlighted Name their link