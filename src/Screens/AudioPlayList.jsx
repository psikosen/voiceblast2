import React, { useState, useEffect } from "react";
import Reaudio from './Components/Reaudio/Reaudio'
import './Components/Reaudio/assets/styles.css'
import AudioPlayerComp from "./Components/AudioPlayerComp";
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './../src/graphql/queries';
import * as mutations from './../src/graphql/mutations';
import * as subscriptions from './../src/graphql/subscriptions';
import AudioPlayer from 'react-h5-audio-player';
import InfiniteScroll from "react-infinite-scroll-component";

/*const playlist = [
    {
        id: '1',
        source: 'https://studio.bio/reaudio/iiwii.mp3',
        trackName: 'IIWII',
        trackArtist: 'Joshua Iz',
        trackImage: 'https://studio.bio/reaudio/images/VIZLP1.jpg',
        loop: true
    },*/
export default function AudioPlayList( ) {
	 const [fullAudioList, setFullAudioList] = useState([]);
	 const [previewAudioList, setPreviewAudioList] = useState([]);
     const [prevRange, setPrevRange] = useState(9);
     const [endRange, setEndRange] = useState(18);
     const [audioListData, setAudioListData] = useState([]);
  	 const[playList,setPlayList] = useState([]);

	  useEffect(() => {
	   	getAllVoiceBlasts();

	    return () => {
	    };
	  }, []);

   async function getAllVoiceBlasts(){
       
       setFullAudioList([]); 
       const allVb = await API.graphql(graphqlOperation(queries.listVoiceblasts ,
                 { 
                   filter: { vbuserid: {ne:""}},
                   //nextToken: nextToken 
                 }));

           if(allVb.data.listVoiceblasts === null)
             return false;

            console.log(allVb);

            let allVab = allVb.data.listVoiceblasts.items;
            
            if(allVab.length > 0){
            //setNextToken(allVb.data.listVoiceblasts.nextToken);

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
                    	var aud = {
		                       	    id: sortedAudioList[i].vbid,
							        source: `${results[i]}`,
							        trackName: sortedAudioList[i].vbtitle !== null? sortedAudioList[i].vbtitle : '',
							        trackArtist: 'Joshua Iz',
							        trackDate:sortedAudioList[i].vbdatecreated,
							        trackImage: 'https://studio.bio/reaudio/images/VIZLP1.jpg',
							        loop: false
							    }
          /*            let aud = <li key = {`${i}o`}   >
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
                                </li>;*/
                         
                          newAudioList.push(aud); 
                    } 
                    
                    var limitedAudioList = newAudioList.slice(0,10);
                    setFullAudioList(newAudioList);
                    setPreviewAudioList(limitedAudioList);
                    
                    toggle('rhap_button-clear rhap_repeat-button','none');
                    toggle('rhap_button-clear rhap_volume-button','none');
                    toggle('rhap_time rhap_current-time','none');
                    toggle('rhap_time rhap_total-time','block');
                  }  
                
            })
          }
    }

    function toggle(className, displayState){
         var elements = document.getElementsByClassName(className)
             //elements.map((a)=>{a.style.display = displayState})
            for (var i = 0; i < elements.length; i++){
                  elements[i].style.display = displayState;
            }
     }

    function fetchMoreVoiceBlasts(){
          if(previewAudioList.length >= fullAudioList.length ){
               setEndRange(nextAudioList.length + 1);
          }

          setPrevRange(prevRange + 9);
          if(endRange < fullAudioList.length){
            setEndRange(endRange + 9);
          }else{
            setEndRange(fullAudioList.length);
          }
          
          let nextAudioList = previewAudioList.concat(fullAudioList.slice(prevRange,endRange));
          //setPreviewAudioList(null);
          setPreviewAudioList(nextAudioList);
    }

	return(

		<div  className ={"hide-native-scrollbar"}
                    style={{padding:20, margin:30, marginLeft:'20%', 
                     width:'60%',border: '2px solid black', 
                      height:'400px'}}>
      <div >
{/*       <InfiniteScroll
                style={{width:'100%', top:'20px', height:'370px', padding:'1%'}}
                dataLength = {fullAudioList.length}
                next={fetchMoreVoiceBlasts} 
                hasMore={endRange <= fullAudioList.length ? true : false}
                loader={<h4>Loading...</h4>}
                height={200}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>End Of Voice Blasts</b>
                  </p>
                }>*/}
                 
            <Reaudio playlist={previewAudioList} /> 
       {/* </InfiniteScroll>*/}
        </div>
    </div>
  )
}