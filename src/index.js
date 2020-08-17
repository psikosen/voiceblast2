import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './Screens/Images/vlogo.png';
import {FiSettings} from 'react-icons/fi';
import {BsFillPersonFill} from 'react-icons/bs';
import {GrLogout} from "react-icons/gr";
import * as serviceWorker from './serviceWorker';
import App from './App';
import CreateProfile from './Screens/CreateProfile';
import EditProfile from './Screens/EditProfile'; 
import ForgottenPassword from './Screens/ForgottenPassword';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import Explore from './Screens/Explore';
import ProfileSettings from './Screens/ProfileSettings';
import VoiceBlastMain from './Screens/VoiceBlastMain';
import ConfirmationCode from './Screens/ConfirmationCode';
import IndividualVoiceBlast from './Screens/Components/IndividualVoiceBlast';
import AudioPlayList from './Screens/AudioPlayList';
import VoiceRecorderScreen from './Screens/VoiceRecorderScreen';
import ProfileDisplayIndividualUser from './Screens/ProfileDisplayIndividualUser';

import { BrowserRouter as Router, Route, withRouter   } from "react-router-dom";
import { createBrowserHistory } from "history";
import Amplify, { Auth } from 'aws-amplify';

// Set up aws config
import awsconfig from './aws-exports';
       Amplify.configure(awsconfig);

const history = createBrowserHistory(); 

// for the logo, if user is already logged in, logo should navigate to profile screen
async function signOut() {
        try {
             await Auth.signOut();
             history.push("/");
        } catch (error) {
            console.log('error signing out: ', error);
        }
}

async function ionViewCanEnter(){
    return await Auth.currentAuthenticatedUser()
      .then(() => {
       return true; 
     })
      .catch(() => {
       document.getElementById('logout').remove();
       document.getElementById('setting').remove();
       document.getElementById('editProfile').remove();
       return false; 
     });

}


ReactDOM.render(
  <React.StrictMode>
   <Router forceRefresh={true} history={history}>
     <div className ={'navbar'} style={{backgroundColor:'#bd65e0'}}>
       <a href={"/"}> <img src={logo}/> </a>
       {window.location.pathname === '/'        ||
        window.location.pathname === '/login'   ||
        window.location.pathname === '/signup'  ||
        window.location.pathname === '/explore' || 
        window.location.pathname === '/confimationCode'||
        window.location.pathname === '/forgottenPass'  ||
        window.location.pathname === '/crp'          
        ? null:
        <div>
         <a id ={"logout"} href={"/"} title={"Log Out"}> <GrLogout style={{float:'right' }} onClick={signOut} /> </a>
         <a id ={"setting"} href={"/settings"}> <FiSettings style={{float:'right'}}/> </a>
         <a id= {"editProfile"} href={"/editProfile"}> <BsFillPersonFill style={{float:'right', marginLeft:5 }}/> </a>
         
        </div>
        }  

     </div>
     <Route path = "/" exact render = {App}/>
     <Route path = "/login" component = {Login} />   
     <Route path = "/signup" component = {SignUp} />
     <Route path = "/confimationCode" component = {ConfirmationCode} />
     <Route path = "/forgottenPass" component = {ForgottenPassword} />
     <Route path = "/explore" component = {Explore} />
     <Route path = "/explore/:username" component = {Explore} />
     <Route path = "/audioPlayList" component = {AudioPlayList} />
     <Route path = "/settings" component = {ProfileSettings} />
     <Route path = "/crp" component = {CreateProfile} />
     <Route path = "/editProfile" component = {EditProfile} />
     <Route path = "/videoRecorder" component = {VoiceRecorderScreen} />
     <Route path = "/vbm/:id" component = {VoiceBlastMain} />
     <Route path = "/vb/view:username" component = {ProfileDisplayIndividualUser} />
     <Route path = "/vb/view/ivb:username" component = {IndividualVoiceBlast} />
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//ionic start --start-id yfzsS2EEk
 
serviceWorker.unregister();
