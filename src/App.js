import React from 'react';
//import logo from './logo.svg';
import './App.css';
import "./styles.scss";
import InitLogin from './InitLogin';
//import * as serviceWorker from './serviceWorker';
import awsconfig from './aws-exports';
import Amplify from 'aws-amplify';
Amplify.configure(awsconfig);
// Initialize the Amazon Cognito credentials provider

function App() {
  return (
     <InitLogin/>
  );
}

export default App;
