import React, { useState, useRef } from "react";
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
import {FiShare2} from "react-icons/fi";
//import Popover from 'react-bootstrap/Popover';
import * as ReactBootstrap from 'react-bootstrap';

export default function ShareSocialListButton({path}) {
    const dataFromNextJS = {
    request: {
      path: `${path}` // change to our website /vbm:id
    }
  }; 
  const ref = useRef()
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

    function OpenPopOver () 
    {
       return (
           <ReactBootstrap.Popover id="popover-contained" ref = {ref}    
               data-trigger="focus"  style={{width:'10%', height:'40', display:'block', marginTop:85,marginLeft:910 }}>
            <span onClick={hidePopover } >X</span>
            <ReactBootstrap.Popover.Title as="h3">Share Voice Blast Profile</ReactBootstrap.Popover.Title>
            <ReactBootstrap.Popover.Content>
             <ul className="vertical-menu"  >
                 {setShareButtons()}
             </ul>
            </ReactBootstrap.Popover.Content>
          </ReactBootstrap.Popover>
        );
    }
    function hidePopover()  
    { 
        console.log(ref);
        console.log(ref.current);
        ref.current.hidden = true
    }

   return(
         <ReactBootstrap.OverlayTrigger  
                          trigger="click" 
                          placement="bottom"
                          rootClose = {true} 
                          overlay={OpenPopOver}>
          <FiShare2 />  
         </ReactBootstrap.OverlayTrigger>

   	  
   	)
}