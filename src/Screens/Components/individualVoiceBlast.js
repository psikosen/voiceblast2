import React, { useState, useEffect } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function IndividualVoiceBlast(props){
    const [userid, setUserid] = useState(props.location.state === undefined ? "" : 
                                       props.location.state.userid);
    const [vbidd, setVbidd] = useState(props.location.state === undefined ? "" : 
                                       props.location.state.vbidd);
	return(
        <div>
        	/*audio player
        	audio tract title
        	duration*/
        </div>
		);
}