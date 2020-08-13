import React, { useEffect, useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import CameraRecorder from './CameraRecorder';
import RecordRTC from 'recordrtc';
import 'react-voice-recorder/dist/index.css';
import Timer from "./AccurateTimer";

export default function RecorderFooter({ newVoiceBlast }) {

  let styles = {
    header: {
      display: "flex",
      justifyContent: "center"
    },
    sticky: {
      position: "fixed",
      top: "45%",
      width: "100%",
      marginLeft: "50%"
    },
    list: {
      listStyle: "none",
      width: "100%",
      borderRadius: 60,
      borderColor: "white",
      borderWidth: 5
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
  });

  //RecordAudio
  return (
    <div>
      <header id="myHeader" style={styles.sticky}>
        <ul>
          <li style={styles.list}>
          <CameraRecorder newVoiceBlast = {newVoiceBlast}/>
          </li>
        </ul>
      </header>
    </div>
  );
}
