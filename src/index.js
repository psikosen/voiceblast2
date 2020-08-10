import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CreateProfile from './CreateProfile';
import ForgottenPassword from './ForgottenPassword';
import SignUp from './SignUp';
import Login from './Login';
import VoiceBlastMain from './VoiceBlastMain';
import individualVoiceBlast from './individualVoiceBlast';
import { BrowserRouter as Router, Route,  } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
   <Router forceRefresh={true} history={history}>
     <Route path = "/" exact render = {App }/>
     <Route path = "/login" component = {Login} />
     <Route path = "/signup" component = {SignUp} />
     <Route path = "/forgottenPass" component = {ForgottenPassword} />
     <Route path = "/vbm" component = {VoiceBlastMain} />
     <Route path = "/vbm/share:id" component = {individualVoiceBlast} />
     <Route path = "/crp" component = {CreateProfile} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
