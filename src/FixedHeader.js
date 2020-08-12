import React, {useEffect, useState } from "react";
import { IoIosCloudyNight } from "react-icons/io";
import {FiShare2} from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";
import ShareSocialListButton from "./ShareSocialListButton";
import { BrowserRouter as Route,  } from "react-router-dom";
import * as ReactBootstrap from 'react-bootstrap';


let styles = {
    header: {
      display: "flex",
      fontWeight: 600,
      height: "60px"
    },
    sticky: {
      background: "red",
      position: "fixed",
      top: 0,
      marginTop:'3.5%',
      marginLeft:'20%',
      width:'70%' 
    },
    list: {
      listStyle: "none"
    },
    image: {
      float: "left",
      margin: 1
    },
  };


export default function FixedHeader({profilePhoto,userName,vburl}) {
  const [shareList, setShareList] = useState(null);

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  return (
    <div >
      <header id="myHeader" style={styles.sticky}>
        <ul style={styles.list}>
          <img
            style={styles.image}
            alt={""}
            src={profilePhoto}
            width={50}
            height={50}
          />
          <li>{userName}</li>
          <li><a href = {`https://${vburl}`} target="_blank"> {vburl} </a></li>
          <li style={{ float: "right", marginRight: 10 }}>
          <ReactBootstrap.OverlayTrigger 
                  trigger="click" 
                  placement="bottom"
                  overlay={<ShareSocialListButton/>} containerPadding={2}>
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
