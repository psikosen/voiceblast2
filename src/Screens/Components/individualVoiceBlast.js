import React, { useState, useEffect } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaMicrophoneAlt } from "react-icons/fa";
import RecorderFooter from "./../RecorderFooter";
import FixedHeader from "./../FixedHeader";
import AudioPlayerComp from "./../Components/AudioPlayerComp";
import AudioListComponent from "./../Components/AudioListComponent";
import "./../Css/styles.scss";
import {  useHistory  } from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './../../src/graphql/queries';
import * as mutations from './../../src/graphql/mutations';
import * as subscriptions from './../../src/graphql/subscriptions';
import Media from "react-media";
import logo from './../Images/vlogo.png'; 
import InfiniteScroll from "react-infinite-scroll-component";

export default function IndividualVoiceBlast(props){
    const [userid, setUserid] = useState(props.location.state === undefined ? "" : 
                                       props.location.state.userid);
    const [vbidd, setVbidd] = useState(props.location.state === undefined ? "" : 
                                       props.location.state.vbidd);
    const [fullAudioList, setFullAudioList] = useState([]);
    const [previewAudioList, setPreviewAudioList] = useState([]);
    const [prevRange, setPrevRange] = useState(9);
    const [endRange, setEndRange] = useState(18);
    
    const [audioListData, setAudioListData] = useState([]);
    const [newAudioFile, setNewAudioFile] = useState(null);
    const [playUrl, setPlayUrl] = useState(null);
    const [newAudioComponent, setNewAudioComponent] = useState();
    const [isMobile, setMobile] = useState(false);
    const [mediaQuery, setMediaQuery] = useState("(min-width: 600px) and (max-width: 900px)");
    const [nextToken, setNextToken] = useState(null);
    const [profilePhoto,setprofilePhoto] = useState("");
    const [userName, setUserName] = useState(""); 
    const [vburl, setVburl] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState(""); 
    const [vbbio, setVbbio] = useState("");
    const [error, setError] = useState("");   
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
    },[]);


  async function getAllVoiceBlasts(){
       
       setFullAudioList([]); 
     
       const allVb = await API.graphql(graphqlOperation(queries.listVoiceblasts ,
                 { 
                   filter: { vbuserid: {eq:userid} },
                   nextToken: nextToken 
                 }));

           if(allVb.data.listVoiceblasts === null)
             return false;

            console.log(allVb);

            let allVab = allVb.data.listVoiceblasts.items;
            
            if(allVab.length > 0){
            setNextToken(allVb.data.listVoiceblasts.nextToken);

            console.log(allVab);

            let tempAudioList = audioListData;
            let finishedAudioList =[];

            if(audioListData.length > 0){
                finishedAudioList = tempAudioList.concat(allVab);
             }else{
                finishedAudioList = allVab;
             }

            let sortedAudioList = finishedAudioList.sort(function(a,b){
                      console.log(b);
                      return b.vbdatecreated.localeCompare(a.vbdatecreated);
                });

            setAudioListData(sortedAudioList);

            let finishedMap = sortedAudioList.map((a)=>{
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
                                                     playTitle = {sortedAudioList[i].vbtitle !== null? sortedAudioList[i].vbtitle : ''} 
                                                     playUrl = {`${results[i]}`} 
                                                     playPath = {sortedAudioList[i].vbaudpath}
                                                     vbidd = {sortedAudioList[i].vbid} 
                                                     vbviews = {sortedAudioList[i].vbviews}
                                                     getAllVoiceBlasts = {getAllVoiceBlasts}
                                                     viewOnly={true}
                                                     vbusrid ={sortedAudioList[i].vbusrid}
                                                     vbdatecreated = {sortedAudioList[i].vbdatecreated}
                                                     vbUsrObj = {{
                                                        vbuimg:sortedAudioList[i].vbuimg === null?"":sortedAudioList[i].vbuimg ,
                                                        vbuusername:sortedAudioList[i].vbuusername,
                                                        vbuurl:sortedAudioList[i].vbuurl,
                                                        vbubio:sortedAudioList[i].vbubio,
                                                        vbufullname:sortedAudioList[i].vbufullname ,
                                                        vbusrid:sortedAudioList[i].vbuserid  }
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