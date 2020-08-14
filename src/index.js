import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './Screens/Images/vlogo.png';
import {FiSettings} from 'react-icons/fi';
import * as serviceWorker from './serviceWorker';
import App from './App';
import CreateProfile from './Screens/CreateProfile';
import ForgottenPassword from './Screens/ForgottenPassword';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import Explore from './Screens/Explore';
import ProfileSettings from './Screens/ProfileSettings';
import VoiceBlastMain from './Screens/VoiceBlastMain';
import individualVoiceBlast from './Screens/Components/individualVoiceBlast';
import VoiceDisplayIndividualUser from './Screens/VoiceDisplayIndividualUser';

import { BrowserRouter as Router, Route, withRouter   } from "react-router-dom";
import { createBrowserHistory } from "history";
import Amplify, { Auth } from 'aws-amplify';

// Set up aws config
import awsconfig from './aws-exports';
       Amplify.configure(awsconfig);

const history = createBrowserHistory(); 

ReactDOM.render(
  <React.StrictMode>
   <Router forceRefresh={true} history={history}>
     <div className ={'navbar'} style={{backgroundColor:'#bd65e0'}}>
       <img src={logo}/>
       {window.location.pathname === '/' ||
        window.location.pathname === '/login' ||
        window.location.pathname === '/signup' ||
        window.location.pathname === '/explore'
        ? null:<FiSettings style={{float:'right'}}/>}       
     </div>
     <Route path = "/" exact render = {App }/>
     <Route path = "/login" component = {Login} />
     <Route path = "/forgottenPass" component = {ForgottenPassword} />
     <Route path = "/explore" component = {Explore} />
     <Route path = "/signup" component = {SignUp} />
     <Route path = "/settings" component = {ProfileSettings} />
     <Route path = "/crp" component = {CreateProfile} />
     <Route path = "/vbm" component = {VoiceBlastMain} />
     <Route path = "/vbm:vbid" component = {VoiceDisplayIndividualUser} />
     <Route path = "/vbm/share:vbid" component = {individualVoiceBlast} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//ionic start --start-id yfzsS2EEk
 
serviceWorker.unregister();
