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
    this.stopRecording = this.stopRecording.bind(this);
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

  async startRecord() {
    if(this.state.isRecording){
      await this.setState({isRecording: false});
    }else{
      await this.setState({isRecording: true});
    }

       this.getUserMedia(stream => {
        this.state.recordMicrophone = RecordRTC(stream, { type: 'audio' });
        this.state.recordMicrophone.startRecording();
       });
  }

   stopRecording(){
    this.state.recordMicrophone.stopRecording(() => {
      //this.state.recordMicrophone.save();
      //let recordedBlob = new Blob([this.state.recordMicrophone.blob], {type:'mp3'});
      console.log(this.state.recordMicrophone.blob);
      this.props.newVoiceBlast(this.state.recordMicrophone.blob);
      this.props.setURL( this.state.recordMicrophone.toURL());
      //this.state.recordMicrophone.toUrl();
    });
   }

  render() {
    return (
      <div>
        {this.state.isRecording ?
         (
          <div onClick={this.stopRecording}> 
           <Timer initialSeconds={60} />
          </div>
           ):
         (<FaMicrophoneAlt onClick={this.startRecord}/>)
        }
      </div>
    )
  }
}

export default CameraRecorder;