import React from 'react';
import RecordRTC from 'recordrtc';
import { FaMicrophoneAlt } from "react-icons/fa";
import Timer from "./AccurateTimer";

class CameraRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
                  recordMicrophone: null,
                  isRecording: false,
                  seconds:60 
                 };

    this.requestUserMedia = this.requestUserMedia.bind(this);
    this.startRecord = this.startRecord.bind(this); 
    this.stopRecording = this.stopRecording.bind(this);
    this.getUserMedia = this.getUserMedia.bind(this);
  }
 
  getUserMedia(callback) {
    navigator.getUserMedia({ audio: true, video: false, disabled:false },
             callback, error => alert(JSON.stringify(error)));
  }

  requestUserMedia() {
    this.getUserMedia(stream => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    });
  }

  async startRecord() {
    await this.setState({isRecording: true});

    this.getUserMedia(stream => {
      this.state.recordMicrophone = RecordRTC(stream, { type: 'audio' });
      this.state.recordMicrophone.startRecording();
    });
  }

  async stopRecording(){
    await this.setState({isRecording: false});

    this.state.recordMicrophone.stopRecording(() => {
      //this.state.recordMicrophone.save();
      let recordedBlob = new Blob([this.state.recordMicrophone.blob], {type:'mp3'});
      this.props.newVoiceBlast(this.state.recordMicrophone.toURL(),recordedBlob); 
    });
   }

  render() {
    return (
      <div >
        {this.state.isRecording ?
         (<div onClick={this.stopRecording} 
               style={{ width:70,
                        height:70,
                        marginTop:150, 
                        marginLeft:-100 }}> 
           <Timer timeObj={{initialSeconds:60,
                            initialMinutes:0 
                          }} 
                   stopRecording = {this.stopRecording} />
          </div>
         ):
         (<FaMicrophoneAlt onClick={this.startRecord} 
                           style={{ width:70,
                                    height:70, 
                                    marginTop:150, 
                                    marginLeft:-100 
                                  }}/>
          )
        }
      </div>
    )
  }
}

export default CameraRecorder;