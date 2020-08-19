import React, {useEffect, useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa"; 
import FixedHeader from "./FixedHeader";
import AudioPlayerComp from "./Components/AudioPlayerComp";
import "./Css/styles.scss";
import {  useHistory  } from "react-router-dom";
import { API, graphqlOperation, Storage,Auth  } from "aws-amplify";
import * as queries from './../src/graphql/queries';
import Media from "react-media";
import InfiniteScroll from "react-infinite-scroll-component";

  let styles = {
    header: {
      display: "flex",
      justifyContent: "center"
    },
    sticky: {
      position: "fixed",
      top: "85%",
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

export default function VoiceBlastMain(props) {
  const [fullAudioList, setFullAudioList] = useState([]);
  const [previewAudioList, setPreviewAudioList] = useState([]);
  const [prevRange, setPrevRange] = useState(9);
  const [endRange, setEndRange] = useState(18);
  
  const [audioListData, setAudioListData] = useState([]);
  const [isMobile, setMobile] = useState(false);
  const [mediaQuery, setMediaQuery] = useState("(min-width: 600px) and (max-width: 900px)");
  const [nextToken, setNextToken] = useState(null);
  const [profilePhoto,setprofilePhoto] = useState("");
  const [userName, setUserName] = useState("");
  const [userid, setUserid] = useState(props.location.state === undefined ? "" : 
                                       props.location.state.userid);
  const [vburl, setVburl] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState(""); 
  const [vbbio, setVbbio] = useState("");
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // reload not working properly the page returns no data
    async function ionViewCanEnter(){
    return await Auth.currentAuthenticatedUser()
      .then(() => { 
        getUser(); 
        document.getElementById('vbfeed').onclick =()=> history.push('/vbf/',{userid:userid});
        setUserAuthenticated(true);
       return true; 
     })
      .catch(() => {
       setUserAuthenticated(false);
       
       sessionStorage.setItem('username','');
       sessionStorage.setItem('userId',''); 
     
       history.push('/');

       return false; 
     });
    }
    ionViewCanEnter();
    
    return ()=>{

       if(!window.orientation || !window.screen.orientation) {
           setMobile(false);
       
       }else{
        setMobile(true);
         if(isMobile){
           setMediaQuery("(max-width: 599px)");
        }
       }

    }
  },[]);
  
     async function getUser(){ 
      if(userid  === ""){
          var currentUsrId = sessionStorage.getItem('userId');
          loadUserData(currentUsrId);
      }else{
          loadUserData(userid);
      }

      async function loadUserData(usrid){
        if(usrid !== null){
        const oneUser = await API.graphql(graphqlOperation(queries.getVbuser , { vbuid: usrid}));
       
        console.log(oneUser);

        if(oneUser.data.getVbuser !== null){
          let usrObj = oneUser.data.getVbuser;
          let usrnm = usrObj.vbuusername;
          let usrurl = usrObj.vbuurl;
          let usrfn = usrObj.vbufirstname;
          let usrln = usrObj.vbulastname;
          let usrimg = usrObj.vbuimg;
          let usrbio = usrObj.vbubio;
          
          setUserid(usrObj.vbuid); 

          sessionStorage.setItem('userId', usrObj.vbuid);

          if(usrnm){
             setUserName(usrnm);  
             sessionStorage.setItem('username',usrnm);
          }

          document.getElementById('vbmain').onclick =()=> history.push(`/vbm/:${usrnm}`,{userid:userid});
    
          if(usrurl){ 
             setVburl(usrurl);
          }

          if(usrfn){
             setfirstName(usrfn);
          }

          if(usrln){
            setlastName(usrln[0]);
          }

          if(usrbio){
            setVbbio(usrbio);
          }

          if(usrimg){
           Storage.get(usrimg)
              .then(result =>{
                console.log(result);
                setprofilePhoto(result);
                getAllVoiceBlasts();
              }).catch(err => console.log(err));
          }
        } 
      }
    }
   }
 
  async function getAllVoiceBlasts(){
       
       setFullAudioList([]); 
       //const allVb = await API.graphql(graphqlOperation(queries.getVoiceblasts,{ vbuserid: userid}));
     
       const allVb = await API.graphql(graphqlOperation(queries.listVoiceblasts ,
                 { 
                   filter: { vbuserid: {eq:userid} }
                 }));

           if(allVb.data.listVoiceblasts === null)
             return false;

            console.log(allVb);

            let allVab = allVb.data.listVoiceblasts.items;
            
            if(allVab.length > 0){
            setNextToken(allVb.data.listVoiceblasts.nextToken);

            console.log(allVab);

            let tempAudioList = audioListData;
            let finishedAudioList =[];

            if(audioListData.length > 0){
                finishedAudioList = tempAudioList.concat(allVab);
             }else{
                finishedAudioList = allVab;
             }

            let sortedAudioList = finishedAudioList.sort(function(a,b){
                      console.log(b);
                      return b.vbdatecreated.localeCompare(a.vbdatecreated);
                });

            setAudioListData(sortedAudioList);

            let finishedMap = sortedAudioList.map((a)=>{
                return Storage.get(a.vbaudpath).then(
                  result => result.split('?')[0]).catch(err => console.log(err));

             });
 
            Promise.all(finishedMap).then(function(results) {
                console.log(results);
                 if(results.length > 0 ){ //{"http://voiceblastvbz93181216-dev.s3.amazonaws.com/public/" + a.vbaudpath}
                    var newAudioList = [];

                    for(var i = 0 ; i < results.length;i++){
                      let aud = <li key = {`${i}o`}>
                                    <AudioPlayerComp  
                                                     key = {`${i}a`}
                                                     playTitle = {sortedAudioList[i].vbtitle !== null? sortedAudioList[i].vbtitle : ''} 
                                                     playUrl = {`${results[i]}`} 
                                                     playPath = {sortedAudioList[i].vbaudpath}
                                                     vbidd = {sortedAudioList[i].vbid} 
                                                     vbviews = {sortedAudioList[i].vbviews}
                                                     getAllVoiceBlasts = {getAllVoiceBlasts}
                                                     vbusrid ={sortedAudioList[i].vbusrid}
                                                     viewOnly = {false}
                                                     vbdatecreated = {sortedAudioList[i].vbdatecreated}
                                                     vbUsrObj = {{
                                                        vbuimg:sortedAudioList[i].vbuimg === null?"":sortedAudioList[i].vbuimg.split('?')[0] ,
                                                        vbuusername:sortedAudioList[i].vbuusername,
                                                        vbuurl:sortedAudioList[i].vbuurl,
                                                        vbubio:sortedAudioList[i].vbubio,
                                                        vbufullname:sortedAudioList[i].vbufullname,
                                                        vbusrid:sortedAudioList[i].vbuserid
                                                          }
                                                      } 
                                                     > 
                                    </AudioPlayerComp>
                                </li>;
                         
                          newAudioList.push(aud); 
                    } 
                    
                    var limitedAudioList = newAudioList.slice(0,10);
                    setFullAudioList(newAudioList);
                    setPreviewAudioList(limitedAudioList);
                    
                    toggle('rhap_button-clear rhap_repeat-button','none');
                    toggle('rhap_button-clear rhap_volume-button','none');
                    toggle('rhap_time rhap_current-time','none');
                    //toggle('rhap_time rhap_total-time','none');
                  }  
                
            })
          }
    }
    
    function fetchMoreVoiceBlasts(){
       /*   if(previewAudioList.length >= fullAudioList.length ){
               setEndRange(nextAudioList.length + 1);
          }*/

          setPrevRange(prevRange + 9);
          if(endRange < fullAudioList.length){
            setEndRange(endRange + 9);
          }else{
            setEndRange(fullAudioList.length);
          }
          
          let nextAudioList = previewAudioList.concat(fullAudioList.slice(prevRange,endRange));
          //setPreviewAudioList(null);
          setPreviewAudioList(nextAudioList);

          toggle('rhap_button-clear rhap_repeat-button','none');
          toggle('rhap_button-clear rhap_volume-button','none');
          //toggle('rhap_time rhap_current-time','none');
          toggle('rhap_time rhap_total-time','none');

           
    }

      function toggle(className, displayState){
         var elements = document.getElementsByClassName(className)
             for (var i = 0; i < elements.length; i++){
                  elements[i].style.display = displayState;
                  }
                  //<Media query={{}}> 
      }
 
  return (
     <> 
        <div style={{padding:5, borderColor:'gray'}}>

         <FixedHeader
                           profilePhoto ={profilePhoto}
                           fullName={`${firstName} ${lastName}.`}
                           usrnmurl = {userName}
                           vburl={vburl}
                           vbbio={vbbio}
           />
 
       <div 
             style={{padding:20, margin:30, marginLeft:'20%', 
                     width:'60%',border: '2px solid black', 
                     height:'80%'}} > 
             <InfiniteScroll
                className="hide-native-scrollbar"
                style={{width:'200%', top:'50px',  padding:'28%'}}
                dataLength = {0}
                next={fetchMoreVoiceBlasts} 
                hasMore={endRange <= fullAudioList.length ? true : false}
                loader={<h4>Loading...</h4>}
                height={600}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>End Of Voice Blasts</b>
                  </p>
                }>
                  {previewAudioList}
              </InfiniteScroll>
            </div> 
          <div id="myHeader" style={styles.sticky}>
            <ul>
              <li style={styles.list}>
             <FaMicrophoneAlt  
                    style={{ width:70,
                             height:70,  
                             marginLeft:-100 
                         }}
                    onClick={()=>history.push("/videoRecorder",
                                              {userName:userName,
                                               usrid:userid,
                                               usrurl:vburl,
                                               usrimg:profilePhoto,
                                               fullName:`${firstName} ${lastName[0]}`,
                                               usrbio:vbbio

                                             })} />
              </li>
            </ul>
          </div>   
        </div> 
    </>
  );
}



// {//<Media query= {mediaQuery}>}
     //  {</Media>}
     // if no voice blasts
     // display graphic with instructions
     // infinite scroll 
     // only show 10