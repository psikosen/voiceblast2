import React, {useEffect } from "react";
import { IoIosCloudyNight } from "react-icons/io";
import {FiShare2} from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";
import { BrowserRouter as Route,  } from "react-router-dom";

export default function FixedHeader({profilePhoto,userName,vburl}) {
  let styles = {
    header: {
      display: "flex",
      "align-items": "center",
      justifyContent: "center",
      "font-weight": 600,
      height: "60px"
    },
    sticky: {
      background: "red",
      position: "fixed",
      top: 0,
      marginTop:'1.8%',
      marginRight:10,

      width: "100%"
    },
    list: {
      listStyle: "none"
    },
    image: {
      float: "left",
      margin: 2
    }
  };

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
    <div>
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
            <FiShare2 onClick={()=>{}}/>
          </li>
          <li style={{ float: "right", marginRight: 10 }}>
            <DarkModeToggle />
          </li>
        </ul>
      </header>

    </div>
  );
}
