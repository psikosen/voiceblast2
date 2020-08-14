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
  WhatsappIcon
} from "react-share";
import Popover from 'react-bootstrap/Popover';
import * as ReactBootstrap from 'react-bootstrap';

export default function ShareSocialListButton({path}) {
	const dataFromNextJS = {
	  request: {
	    path: `http://${path}` // change to our website /vbm:id
	  }
	};

   function setShareButtons(){

      var componets = [
                 <EmailShareButton url={dataFromNextJS.request.path}> 
                  <EmailIcon size={32} round={true}/>
                 </EmailShareButton>,
                 <FacebookShareButton url={dataFromNextJS.request.path}>
                  <FacebookIcon size={32} round={true}/>
                 </FacebookShareButton>,
                 <LinkedinShareButton url={dataFromNextJS.request.path}>
                  <LinkedinIcon size={32} round={true}/>
                 </LinkedinShareButton>,
                 <TwitterShareButton url={dataFromNextJS.request.path}>
                  <TwitterIcon size={32} round={true}/>
                 </TwitterShareButton>,
                 <WhatsappShareButton url={dataFromNextJS.request.path}>
                  <WhatsappIcon size={32} round={true}  />
                 </WhatsappShareButton>,
                 <RedditShareButton url={dataFromNextJS.request.path} >
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