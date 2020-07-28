import React from 'react';
//import logo from './logo.svg';
import './App.css';
import InitLogin from './InitLogin';
import * as serviceWorker from './serviceWorker';
import Amplify,{AWS} from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
// Initialize the Amazon Cognito credentials provider

function App() {
  return (

    <InitLogin/>
  );
}

export default App;
