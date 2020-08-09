import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';




export default function AudioPlayerComp({playUrl}) {
       return (
       <AudioPlayer
              showSkipControls = {false}
              showJumpControls = {false}
              showDownloadProgress = {false}
              showFilledProgress = {false}
              src={playUrl}
          />
       	)
}