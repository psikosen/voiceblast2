import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import { BsTrash }  from "react-icons/bs";
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './src/graphql/queries';
import * as mutations from './src/graphql/mutations';
import * as subscriptions from './src/graphql/subscriptions';


export default function AudioPlayerComp({playUrl,playTitle,vbidd, vbviews, getAllVoiceBlasts}) {
	   const [vbid, setVbid] = useState(vbidd);

	   function deleteVb(){
		   Storage.remove(`${playTitle}.mp3`).then((result) =>{
		      console.log(result);

		     }).catch((err )=> {
		      console.log(err)
		    });
	   }

	   function deleteVbData(){
		       const vbUpdate = {
                  vbid: vbid
                };

                 API.graphql(graphqlOperation(mutations.deleteVoiceblasts, {input: vbUpdate})).then((a)=>{
                     console.log(a);
                     getAllVoiceBlasts();
                });
	   }

	   function newView(){
	   	  var newViews = vbviews;
	   	      console.log(newViews);
	   	         API.graphql(graphqlOperation(mutations.updateView, {input:{vbid: vbid, vbviews:newViews }} )).then((a)=>{
                     console.log(a);
                });
	   }

       return (
       <div title = {vbid}>
        <p>{playTitle}</p>
        <p>{vbviews}</p>
        <AudioPlayer
              showSkipControls = {false}
              showJumpControls = {false}
              showDownloadProgress = {false}
              showFilledProgress = {false}
              src={playUrl}
              onPlay={() => newView()}
          />
         <BsTrash onClick={()=>deleteVb} />
        </div>
       	)
}