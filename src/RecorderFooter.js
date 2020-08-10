import React, { useEffect, useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
//import { FaRegPauseCircle } from "react-icons/fa";
//import { ReactMic } from "react-mic";
//import AudioPlayer from 'react-h5-audio-player';
import CameraRecorder from './CameraRecorder';
import RecordRTC from 'recordrtc';
import 'react-voice-recorder/dist/index.css';
//import ReactAudioPlayer from "react-audio-player";
import Timer from "./AccurateTimer";



const hasGetUserMedia = !!(window.navigator.getUserMedia || window.navigator.webkitGetUserMedia ||
                        window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia);
var recorder; // globally accessible
var microphone;
var audio =  document.getElementById('audioSrc');;
var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!window.navigator.msSaveOrOpenBlob || !!window.navigator.msSaveBlob);
var isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);


export default function RecorderFooter({ newVoiceBlast, setURL }) {
  const [isRecording, setRecording] = useState(false);
  const [src, setSrc] = useState(null);
  const [recordAudio, setrecordAudio] = useState(null);

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
      if(!hasGetUserMedia) {
          alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      }else{
      }
    };
  });

  //RecordAudio
  return (
    <div>
      <header id="myHeader" style={styles.sticky}>
        <ul>
          <li style={styles.list}>
          <CameraRecorder newVoiceBlast = {newVoiceBlast} setURL = {setURL}/>
          </li>
        </ul>
      </header>
    </div>
  );
}
