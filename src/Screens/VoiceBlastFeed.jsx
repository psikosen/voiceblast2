import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './../src/graphql/queries';
import * as mutations from './../src/graphql/mutations';
import * as subscriptions from './../src/graphql/subscriptions';
import InfiniteScroll from "react-infinite-scroll-component";
import AudioPlayerComp from "./Components/AudioPlayerComp";


export default function VoiceBlastFeed() {
  const [audioList, setAudioList] = useState([]);
  const [audioListData, setAudioListData] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [error, setError] = useState("");   

  useEffect(() => {
    getAllVoiceBlasts();

    return () => {
    };
  }, []);

 async function getAllVoiceBlasts(){
       
       setAudioList([]);

       const allVb = await API.graphql(graphqlOperation(queries.listVoiceblasts ,
                 { vbuserid: userid,
                   nextToken: nextToken,
                   limit:4
                 }));

        console.log(allVb);

            let allVab = allVb.data.listVoiceblasts.items;
            setNextToken(allVb.data.listVoiceblasts.nextToken);

            console.log(allVab);

            let tempAudioList = audioListData;
            let finishedAudioList = tempAudioList.concat(allVab);

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
                 if(results.length > 0 ){ //{"http://voiceblastvb3181216-dev.s3.amazonaws.com/public/" + a.vbaudpath}
                    var newAudioList = [];
                	// vb img url
                    for(var i = 0 ; i < results.length;i++){
                      let aud = <li key = {`${i}o`}>
                                    <AudioPlayerComp key = {`${i}a`}
                                                     playTitle = {sortedAudioList[i].vbtitle !== null? sortedAudioList[i].vbtitle : ''} 
                                                     playUrl = {`${results[i]}`} 
                                                     playPath = {sortedAudioList[i].vbaudpath}
                                                     vbidd = {sortedAudioList[i].vbid} 
                                                     vbviews = {sortedAudioList[i].vbviews}
                                                     getAllVoiceBlasts = {getAllVoiceBlasts}
                                                     vbusrid ={sortedAudioList[i].vbusrid}
                                                     vbdatecreated = {sortedAudioList[i].vbdatecreated}
                                                     > 
                                    </AudioPlayerComp>
                                </li>;
                         
                          newAudioList.push(aud); 
                    } 
                    
                    setAudioList(newAudioList);

                    toggle('rhap_button-clear rhap_repeat-button','none');
                    toggle('rhap_button-clear rhap_volume-button','none');
                    //toggle('rhap_time rhap_current-time','none');
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
     <InfiniteScroll
                style={{width:'100%', top:'20px',  padding:'20%'}}
                dataLength = {audioList.length}
                next={getAllVoiceBlasts}
                hasMore={nextToken === null ? false : true}
                loader={<h4>Loading...</h4>}
                height={200}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>End Of Voice Blasts</b>
                  </p>
                }>
                {audioList}
       </InfiniteScroll> 
    </div>
  );
}

//listVbusers
// chronological feed of voice blasts
// Click on voice black -> Individual Voice blast screen 
// Authors name to profile
// Later creators feeds 2.0.
// Intro blasts 2.0.
// Tag based off catergory 2.0.
