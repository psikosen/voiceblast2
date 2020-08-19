import React, { useState } from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon  
} from "react-share";
import Popover from 'react-bootstrap/Popover';
//import * as ReactBootstrap from 'react-bootstrap';

export default function ShareSocialListButton({path}) {
    const dataFromNextJS = {
    request: {
      path: `${path}` // change to our website /vbm:id
    }
  };
  const[ hre] = useState(dataFromNextJS);


   function setShareButtons(){

      var componets = [
                 <EmailShareButton quote={"Blast Someone!"} url={hre.request.path}> 
                  <EmailIcon size={32} round={true}/>
                 </EmailShareButton>,
                  <FacebookMessengerShareButton redirectUri={hre.request.path} url={hre.request.path}>
                 <FacebookMessengerIcon  size={32} round={true}/>
                 </FacebookMessengerShareButton>,
                 <FacebookShareButton quote={"Blast Someone!"} url={hre.request.path}>
                  <FacebookIcon quote={"Blast Someone!"} size={32} round={true}/>
                 </FacebookShareButton>,
                 <LinkedinShareButton source  ={"Voice Blast!"} quote={"Blast Someone!"} url={hre.request.path}>
                  <LinkedinIcon size={32} round={true}/>
                 </LinkedinShareButton>,
                 <TwitterShareButton quote={"Blast Someone!"} url={hre.request.path}>
                  <TwitterIcon size={32} round={true}/>
                 </TwitterShareButton>,
                 <WhatsappShareButton quote={"Blast Someone!"} url={hre.request.path}>
                  <WhatsappIcon size={32} round={true}  />
                 </WhatsappShareButton>,
                 <RedditShareButton quote={"Blast Someone!"} url={hre.request.path} >
                  <RedditIcon  size={32} round={true}/>
                 </RedditShareButton>
                  ];

       return componets.map((a)=><li>{a}</li>);            
   }

   return(
   	  <Popover id="popover-contained" style={{width:'10%', height:'40', display:'block', marginTop:85,marginLeft:910 }}>
	    <Popover.Title as="h3">Share Voice Blast Profile</Popover.Title>
	    <Popover.Content>
	  	 <ul className="vertical-menu"  >
	         {setShareButtons()}
	     </ul>
	    </Popover.Content>
	  </Popover>
   	)
}