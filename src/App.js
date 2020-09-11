import React  from 'react';
//import logo from './logo.svg';
import './App.css';
import cui from './curatedUserImages/testuser.jpg';
import "./Screens/Css/styles.scss";
//import * as serviceWorker from './serviceWorker';
import awsconfig from './aws-exports';
import Amplify from 'aws-amplify';
Amplify.configure(awsconfig);
// Initialize the Amazon Cognito credentials provider

var curatedUsersList = [{
                     usrnm:"",
                     imgLnk:cui
                     },
                    {
                     usrnm:"",
                     imgLnk:cui
                     },
                     {
                     usrnm:"",
                     imgLnk:cui
                     },
                     {
                     usrnm:"",
                     imgLnk:cui
                     },
                     {
                     usrnm:"",
                     imgLnk:cui
                     },{
                     usrnm:"",
                     imgLnk:cui
                     },
                     {
                     usrnm:"",
                     imgLnk:cui
                     }];


function App() {

  function AddCuratedUsers(){
       return curatedUsersList.map((a)=>
           <a href={`/vb/view:${a.usrnm}`}>
           <img alt = {""}
                width = {80}
                height = {80} 
                src={a.imgLnk}
                style={{borderRadius:80
                       }}
                />

          </a>);
  } 

  return (
   <div>
      <h1>Voice Blast</h1>
      <button>
         <a href = "/signup"> Sign Up</a>
      </button>
      <p>Already A Creator ?
          <a href = "/login" style={{textDecoration: 'underline'}}> Login Here </a> 
      </p>
      <p>  
         <a href = "/explore" style={{textDecoration: 'underline'}}>
          Explore
         </a> 
      </p>
       <p>  
         <a href = "/audioPlayList" style={{textDecoration: 'underline'}}>
          Explore 2
         </a> 
      </p>
      {AddCuratedUsers()}
   </div>
  );
}

// Link them to the top creators in the platform
// Show the top creator - Based off curated Listed
// curatedList Table List 6 people curated Voice blast channels
export default App;
