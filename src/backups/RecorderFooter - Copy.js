import React, { useEffect, useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
//import { FaRegPauseCircle } from "react-icons/fa";
//import { ReactMic } from "react-mic";
//import AudioPlayer from 'react-h5-audio-player';
import {Recorder} from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';
//import ReactAudioPlayer from "react-audio-player";
import Timer from "./AccurateTimer";

export default function RecorderFooter({ audioLt, newVoiceBlast }) {
  const [isRecording, setRecording] = useState(false);
  //const [timer, setTimer] = useState(() => <Timer initialSeconds={60} />);

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

  function startRecorder() {
    if (!isRecording) {
      setRecording(true);
    } else {
      setRecording(false);
    }
  }
  //<FaMicrophoneAlt size={"4em"} onClick={startRecorder} />

  function onData(recordedBlob) {
    //console.log("chunk of real-time data is: ", recordedBlob);
  }

  function onStop(recordedBlob) {
    //console.log("recordedBlob is: ", recordedBlob);
    let blob = new Blob([recordedBlob], { type: "audio/mp3" });
    //console.log(blob);

    let ran = Math.round(Math.random() * (100000 - 1) + 1);
    console.log(ran);
    console.log(blob);
    newVoiceBlast(recordedBlob.blobURL,recordedBlob);
  }

  //RecordAudio
  return (
    <div>
      <header id="myHeader" style={styles.sticky}>
        <ul>
          <li style={styles.list}>
           
          </li>
          <li style={{ listStyle: "none" }} onClick={startRecorder}>
            {isRecording ? (
              <Timer initialSeconds={60} />
            ) : (
              <FaMicrophoneAlt size={"4em"} />
            )}
          </li>
        </ul>
      </header>
    </div>
  );
}

// //<FaRegPauseCircle size={"4em"} onClick={startRecorder} />
/*
 <ReactMic
              width={100}
              height={70}
              margin={5}
              record={isRecording}
              className="sound-wave"
              onStop={onStop}
              onData={onData}
              strokeColor="black"
            />
*/