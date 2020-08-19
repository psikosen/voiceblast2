import React, { useState, useEffect } from "react";
import AudioPlayerComp from "./../Components/AudioPlayerComp"; 
import "./../Css/styles.scss";  
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './../../src/graphql/queries'; 
import Media from "react-media"; 
import {  useHistory  } from "react-router-dom";

export default function IndividualVoiceBlast(props){
    const [userid] = useState(props.location.state === undefined ? "" : 
                                       props.location.state.userid);
    const [vbidd,] = useState(props.location.state === undefined ? "" : 
                                       props.location.state.vbidd);
    const [previewAudioList, setPreviewAudioList] = useState([]);  
    const [audioListData, setAudioListData] = useState([]);
    const [isMobile, setMobile] = useState(false);
    const [mediaQuery, setMediaQuery] = useState("(min-width: 600px) and (max-width: 900px)");
    const history = useHistory();
   
 useEffect(() => {
      // reload not working properly the page returns no data
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
    },[ ]);


  async function getAllVoiceBlasts(){
       

     
       const allVb = await API.graphql(graphqlOperation(queries.listVoiceblasts ,
                 { 
                   filter: { vbuserid: {eq:userid} }
                 }));

           let usrnm = sessionStorage.getItem('username');
           let tmpuserid = sessionStorage.getItem('userId');

           if(tmpuserid !== "" || tmpuserid !== null){
             document.getElementById('vbmain').onclick = ()=> history.push(`/vbm/${usrnm}`,{userid:tmpuserid});
           }

           if(allVb.data.listVoiceblasts === null)
             return false;

            console.log(allVb);

            let allVab = allVb.data.listVoiceblasts.items;
            
            if(allVab.length > 0){ 
            console.log(allVab);

            let tempAudioList = audioListData;
            let finishedAudioList =[];

            if(audioListData.length > 0){
                finishedAudioList = tempAudioList.concat(allVab);
             }else{
                finishedAudioList = allVab;
             }

             let individualB;
             let modifiedList;

                  modifiedList = finishedAudioList.map(function(a,b){  
                    if(vbidd === a.vbid){
                       individualB = a;
                    }else{
                       return a;
                    }
                 });

             let newList = [];

             modifiedList.forEach((a)=>{
               if(a !== undefined){
                  newList.push(a);
               }
             });

             newList.unshift(individualB);  

             setAudioListData(newList);

            let finishedMap = newList.map((a)=>{
                return Storage.get(a.vbaudpath).then(
                  result => result.split('?')[0]).catch(err => console.log(err));

             });

 
            Promise.all(finishedMap).then(function(results) {
                console.log(results);
                 if(results.length > 0 ){ //{"http://voiceblastvbz93181216-dev.s3.amazonaws.com/public/" + a.vbaudpath}
                    var newAudioList = [];

                    for(var i = 0 ; i < results.length;i++){
                      let aud = <li key = {`${i}o`}>
                                    <AudioPlayerComp key = {`${i}a`}
                                                     playTitle = {newList[i].vbtitle !== null? newList[i].vbtitle : ''} 
                                                     playUrl = {`${results[i]}`} 
                                                     playPath = {newList[i].vbaudpath}
                                                     vbidd = {newList[i].vbid} 
                                                     vbviews = {newList[i].vbviews}
                                                     getAllVoiceBlasts = {getAllVoiceBlasts}
                                                     viewOnly={true}
                                                     vbusrid ={newList[i].vbusrid}
                                                     vbdatecreated = {newList[i].vbdatecreated}
                                                     vbUsrObj = {{
                                                        vbuimg:newList[i].vbuimg === null?"":newList[i].vbuimg.split('?')[0] ,
                                                        vbuusername:newList[i].vbuusername,
                                                        vbuurl:newList[i].vbuurl,
                                                        vbubio:newList[i].vbubio,
                                                        vbufullname:newList[i].vbufullname ,
                                                        vbusrid:newList[i].vbuserid  }
                                                      } 
                                                     > 
                                    </AudioPlayerComp>
                                </li>;
                          if(i === 1){
                             newAudioList.push( <div>More from this user</div>); 
                          }

                          newAudioList.push(aud); 
                    } 
                    
                    var limitedAudioList = newAudioList.slice(0,4);
                    setPreviewAudioList(limitedAudioList);
                    
                    toggle('rhap_button-clear rhap_repeat-button','none');
                    toggle('rhap_button-clear rhap_volume-button','none');
                    toggle('rhap_time rhap_current-time','none');
                    //toggle('rhap_time rhap_total-time','none');
                  }  
                
            })
          }
    }
    function toggle(className, displayState){
         var elements = document.getElementsByClassName(className)
             for (var i = 0; i < elements.length; i++){
                  elements[i].style.display = displayState;
                  }
      }

	return(
        <div>
        	{previewAudioList}
        </div>
		);
}