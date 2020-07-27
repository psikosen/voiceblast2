import React from 'react';
//import logo from './logo.svg';
import './App.css';
import InitLogin from './InitLogin';
import * as serviceWorker from './serviceWorker';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';


Amplify.configure(awsconfig);

function App() {
  return (

    <InitLogin/>
  );
}

export default App;
