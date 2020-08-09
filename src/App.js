import React from 'react';
//import logo from './logo.svg';
import './App.css';
import "./styles.scss";
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
     </div>
  );
}

export default App;
