import React from 'react';
import RecordRTC from 'recordrtc';
import { FaMicrophoneAlt } from "react-icons/fa";
import Timer from "./AccurateTimer";

class CameraRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recordMicrophone: null, isRecording: false };
    this.requestUserMedia = this.requestUserMedia.bind(this);
    this.startRecord = this.startRecord.bind(this); 
    this.getUserMedia = this.getUserMedia.bind(this);
  }
 
  getUserMedia(callback) {
    navigator.getUserMedia({ audio: true, video: false },
             callback, error => alert(JSON.stringify(error)));
  }

  requestUserMedia() {
    this.getUserMedia(stream => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    });
  }

  startRecord() {


    if(this.state.isRecording){
      this.setState({isRecording: false});
    }else{
      this.setState({isRecording: true});
    }

    if(this.state.isRecording){
       this.getUserMedia(stream => {
        this.state.recordMicrophone = RecordRTC(stream, { type: 'audio' });
        this.state.recordMicrophone.startRecording();
      });
    }else{

     this.state.recordMicrophone.stopRecording(() => {
      this.state.recordMicrophone.save();
      //let recordedBlob = new Blob([this.state.recordMicrophone.blob], {type:'mp3'});
      console.log(this.state.recordMicrophone.blob);
      this.props.newVoiceBlast(this.state.recordMicrophone.blob);
      this.props.setURL( this.state.recordMicrophone.toUrl());
      //this.state.recordMicrophone.toUrl();
    });
    }

  
  }




  render() {
    return (
      <div>
        {this.state.isRecording ?
         (<Timer initialSeconds={60} />):
         (<FaMicrophoneAlt onClick={this.startRecord}/>)
        }
      </div>
    )
  }
}

export default CameraRecorder;