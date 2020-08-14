import React from 'react';
//import logo from './logo.svg';
import './App.css';
import "./Screens/Css/styles.scss";
//import * as serviceWorker from './serviceWorker';
import awsconfig from './aws-exports';
import Amplify from 'aws-amplify';
Amplify.configure(awsconfig);
// Initialize the Amazon Cognito credentials provider

function App() {
	 
  return (
  	 <div>
      <h1>Voice Blast</h1>
      <button>
         <a href = "/signup"> Sign Up</a>
      </button>
      <p>Already A Creator ?
          <a href = "/login" style={{textDecoration: 'underline'}}> Login Here </a> 
      </p>
      <p> Explore 
         <a href = "/explore" style={{textDecoration: 'underline'}}>
          
         </a> 
      </p>
     </div>
  );
}

// Link them to the top creators in the platform
// Show the top creator - Based off curated Listed
// curatedList Table List 6 people curated Voice blast channels
export default App;
