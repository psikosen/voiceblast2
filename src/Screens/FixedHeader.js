import React, {useEffect } from "react";
import {FiShare2} from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";
import ShareSocialListButton from "./Components/ShareSocialListButton";
import * as ReactBootstrap from 'react-bootstrap';
 

export default function FixedHeader({profilePhoto,fullName,vburl,usrnmurl,vbbio}) {
 
  let styles = {
      header: {
        display: "flex",
        fontWeight: 600,
        height: "60px",
        marginTop:'100px'
      }, 
      list: {
        listStyle: "none"
      },
      image: {
        float: "left",
        margin: 1
      },
    };

  useEffect(() => {

    const header = document.getElementById("myHeader");
    const sticky = header.offsetTop;

    document.getElementById("myHeader").classList.add("myHeader");

    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      }
    });
    return () => {

      document.getElementById("myHeader").classList.add("myHeader");
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  return (
    <div >
      <header id="myHeader"  >
        <ul style={styles.list}>
          <img
            style={styles.image}
            alt={""}
            src={profilePhoto}
            width={50}
            height={50}
          />
          <li>{fullName}</li>
          <li><a href = {`https://${vburl}`} target="_blank"> {vburl} </a></li>
          <li>{vbbio}</li>
          <li style={{ float: "right", marginRight: 10 }}>
          <ReactBootstrap.OverlayTrigger 
                  trigger="click" 
                  placement="bottom"
                  
                  overlay={<ShareSocialListButton path ={`https://${window.location.hostname}/vb/view/${usrnmurl}` }/> } containerPadding={2}>
            <FiShare2 />
          </ReactBootstrap.OverlayTrigger>
          </li>
          <li style={{ float: "right", marginRight: 10 }}>
            <DarkModeToggle />
          </li>
        </ul> 
      </header>

    </div>

  );
}
