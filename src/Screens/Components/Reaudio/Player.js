import React, { useState, useEffect, useRef } from 'react';
import TrackInfo from './TrackInfo';
import Play from './Play';
import Pause from './Pause';
import Bar from './Bar';
import { BsTrash }  from "react-icons/bs";
import {FiShare2} from "react-icons/fi";
import {TiEdit} from "react-icons/ti";
import {BsThreeDots} from "react-icons/bs";
import {FormGroup, FormControl} from "react-bootstrap";  
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShareSocialListButton from "./../ShareSocialListButton";
import * as ReactBootstrap from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as mutations from './../../../src/graphql/mutations'; 


const Player = ({
    source,
    slug,
    trackName,
    trackArtist,
    trackImage,
    trackDate,
    loop,
    preload,
    showTrackInfo,
    togglePlay,
    playPath,
    vbUsrObj,
    vbviews,
    getAllVoiceBlasts,
    viewOnly,
    index,
    isCurrent
}) => {
    const audioRef = useRef()

    const [duration, setDuration] = useState()
    const [curTime, setCurTime] = useState()
    const [playing, setPlaying] = useState(false)
    const [clickedTime, setClickedTime] = useState()
    const [vbid,  ] = useState(vbUsrObj.vbidd);
    const [vbvw, setVbvw] = useState(vbviews);
    const [show, setShow] = useState(false); 
    const [currentPlayTitle,setCurrentPlayTitle] = useState(trackName);
    const [editingTitle, isEditingTitle] = useState(false);
    const [displayAdditionOptions, setDisplayAdditionOptions] = useState(null);
    const [displaying, IsDisplaying] = useState(false);
    const history = useHistory();
    const handleCancel = () => setShow(false);
    const handleShow = () => {setDisplayAdditionOptions(null);setShow(true);}

    // check if source is a single string, if so convert to array
    if (!Array.isArray(source) && String(source) === source) {
        source = source.split()
    }
    
    useEffect(() => {
        const audio = audioRef.current

        // state setters
        const setAudioData = async () => {

            while(audio.duration === Infinity) {
              await new Promise(r => setTimeout(r, 10));
              audio.currentTime = 10000000*Math.random();
            }

            let duration = audio.duration ;
 
            var newDuration = parseTime(duration).trim();

            setDuration(newDuration);
            setCurTime(audio.currentTime)
        }

        const setAudioTime = () => setCurTime(audio.currentTime)

        // DOM listeners: update React state on DOM events
        audio.addEventListener('loadeddata', setAudioData)
        audio.addEventListener('timeupdate', setAudioTime)

        if (clickedTime && clickedTime !== curTime) {
            audio.currentTime = clickedTime
            setClickedTime(null)
        }

        // effect cleanup
        return () => {
            audio.removeEventListener('loadeddata', setAudioData)
            audio.removeEventListener('timeupdate', setAudioTime)
        }
    }, [clickedTime, curTime])

   const parseTime = (time) => { // send time in seconds
    // eslint-disable-next-line 

    let hours = parseInt(time / 60 / 60), 
        mins = Math.abs(parseInt(time / 60) - (hours * 60)), 
        seconds = Math.round(time % 60);
   
    return isNaN(hours) || isNaN(mins) || isNaN(seconds) ? `00:00:01` :
           `${hours > 9 ?Math.max(hours, 0):'0'+Math.max(hours, 0)}:
            ${mins > 9 ?Math.max(mins, 0):'0'+Math.max(0, mins)}:
            ${seconds > 9 ?Math.max(0, seconds):'0'+Math.max(0, seconds)}`;

    }
        function checkOutUsersProfile(){
           history.push(`/vb/view:${vbUsrObj.vbuusername}`, {userid:vbUsrObj.vbusrid} );
      }
      
      function goToIndividualVoiceBlast(){
           history.push(`/vb/view/ivb:${vbUsrObj.vbuusername}`, {userid:vbUsrObj.vbusrid, vbidd:vbUsrObj.vbidd } );
      }

      function editTitle(){
          setDisplayAdditionOptions(null);
          isEditingTitle(true);
      }
      function cancelUpdate(){
          setDisplayAdditionOptions(null);
          isEditingTitle(false);
      }
      function updateVoiceBlastTitle(){ 
            const editVBTitle = {
                 vbid: vbid,
                 vbtitle: currentPlayTitle
            };

            console.log('Entering vb');

            API.graphql(graphqlOperation(mutations.updateVoiceblastsTitle, {input: editVBTitle})).then((a)=>{
                console.log(a);
                setDisplayAdditionOptions(null);
                IsDisplaying(false);
                isEditingTitle(false);
                setCurrentPlayTitle(currentPlayTitle);
            }); 
      }

      function showAdditionalItems(){
        if(!displaying){
           IsDisplaying(true);
           setDisplayAdditionOptions(
            <div>
              <TiEdit  onClick = { editTitle } />
              <BsTrash onClick=  { handleShow } />
            </div>
            );
        }else{
            setDisplayAdditionOptions(null);
            IsDisplaying(false);
        }
      }

       function deleteVb(){
           Storage.remove(`${playPath}`).then((result) =>{
              console.log(result);

             }).catch((err )=> {
              console.log(err)
            });
       }

       function deleteVbData(){ 
               setShow(false);
               const deleteVB = {
                  vbid: vbid
                };

                 API.graphql(graphqlOperation(mutations.deleteVoiceblasts, {input: deleteVB})).then((a)=>{
                     console.log(a);
                     deleteVb();
                     getAllVoiceBlasts();
                });
       }

       async function newView(){
          var newViews = vbviews;
              console.log(newViews);

              await API.graphql(graphqlOperation(mutations.updateView,
                 {vbid: vbid, vbviews:newViews } )).then((a)=>{
                     console.log(a);
                     console.log('======');
                     setVbvw(a.data.updateView.vbviews); 
                });
               
       }

       function timeOfPost(time){
         var vbdate = new Date(time);
             if(isToday(vbdate)){
                var timeVBPosted = new Date().getHours() - vbdate.getHours();
                if(timeVBPosted === 0){
                    timeVBPosted = new Date().getMinutes() - vbdate.getMinutes();
                    if(timeVBPosted === 0){
                       timeVBPosted = new Date().getSeconds() - vbdate.getSeconds();
                       return timeVBPosted > 1 ? `${timeVBPosted} Seconds Ago`: `${timeVBPosted} Second Ago`;
                    }
                   return timeVBPosted > 1 ? `${timeVBPosted} Minutes Ago`: `${timeVBPosted} Minute Ago`;
                }

                return timeVBPosted > 1 ? `${timeVBPosted} Hours Ago`: `${timeVBPosted} hour Ago`;
             }else{
                return new Date(time).toLocaleDateString();
             }
       }

      const isToday = (someDate) => {
      const today = new Date()
        return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
      } 

    return (
        <div className="player">
           <Modal show={show} onHide={handleCancel}>
                <Modal.Header closeButton>
                  <Modal.Title style={{color:'black'}}>{currentPlayTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{color:'#873260'}} >Are you sure You Want to Delete This Voice Blast ?</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={deleteVbData}>
                    Yes
                  </Button>
                </Modal.Footer>
           </Modal>

            <audio id={slug} ref={audioRef} loop={loop} preload={preload}>
                {source &&
                    source.map((src, i) => {
                        return <source key={i} src={src} />
                    })}
                Your browser does not support the <code>audio</code> element.
            </audio>


            <div className="controls">
                {playing && isCurrent ? (
                    <Pause
                        handleClick={() => {
                            setPlaying(false)
                            togglePlay(slug, index)
                        }}
                    />
                ) : (
                    <Play
                        handleClick={() => {
                            setPlaying(true);
                            newView();
                            togglePlay(slug, index)
                        }}
                    />
                )}
                {editingTitle ?
                  (<div>
                     <FormGroup controlId="playtitle" >
                      <FormControl
                        autoFocus
                        type="test"
                        value={currentPlayTitle}
                        onChange={e => setCurrentPlayTitle(e.target.value)}
                      />
                      </FormGroup>
                       <Button variant="secondary" style={{margin:'4%'}} onClick={cancelUpdate}> Cancel</Button>
                       <Button variant="success"   onClick={updateVoiceBlastTitle}> Edit Title</Button>
                      </div>
                     )
                :<TrackInfo
                        trackName={trackName}
                        trackArtist={currentPlayTitle}
                        trackDate = {timeOfPost(trackDate)}
                        trackImage={trackImage ? trackImage : null}
                        viewOnly = {viewOnly}
                        checkOutUsersProfile = {checkOutUsersProfile}
                        goToIndividualVoiceBlast = {goToIndividualVoiceBlast}
                        views = {vbvw}
                    />
                 }
                  <span>
                    {duration }
                 </span>   
                 {viewOnly ?null:
                 <div>
                  <BsThreeDots onClick={showAdditionalItems} />
                   {displayAdditionOptions}
                  </div>
                 } 
                 <ShareSocialListButton path= {`${window.location.origin}/vb/view/ivb:${vbUsrObj.vbidd}`}   containerPadding={2} />
            </div>
        </div>
    )
}

Player.defaultProps = {
    source: 'https://studio.bio/reaudio/iiwii.mp3',
    showTrackInfo: true,
    trackName: 'Unknown',
    trackArtist: 'Unknown Artist',
    loop: false,
    preload: 'auto'
}

export default Player
