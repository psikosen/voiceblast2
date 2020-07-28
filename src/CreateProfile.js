import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, useHistory  } from "react-router-dom";
import VoiceBlastMain from './VoiceBlastMain';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap"; 
import { API, graphqlOperation  } from "aws-amplify";
import * as queries from './src/graphql/queries';
import * as mutations from './src/graphql/mutations';
import * as subscriptions from './src/graphql/subscriptions';

export default function CreateProfile(props) {
   const [userName, setUserName] = useState("");
   const [podCastUrl, setPodCastUrl] = useState("");
   const [userid, setUserid] = useState(1);
   const [voiceList,setVoiceList] = useState([]);
   
   useEffect(()=>{
       // Query using a parameter
        getUsers();
   },[]);
    
   async function getUsers(){
        const oneUser = await API.graphql(graphqlOperation(queries.getUsers, { id: '60111116-5838-4a2c-a5e8-27689d56f16e' }));
        console.log(oneUser);
        if(oneUser.data.getUsers !== null){
           setUserName(oneUser.username);
           setPodCastUrl(oneUser.url);
        }
   }

   async function createProfile(){

        const todo = {username: userName, url: podCastUrl };
        await API.graphql(graphqlOperation(mutations.createUsers, {input: todo}));
     
        return true
   }

    async function editProfile(){
     const profileUpdate = {
        id: userid,
        //email:email
        url: podCastUrl
      };

      const updatedTodo = await API.graphql(graphqlOperation(mutations.updateUsers, {input: profileUpdate}));

   }


    async function validateForm(){
        if (userName !== '' && podCastUrl !== ''){
          // await history.push('/voiceblastmain');
        }
    }
   
    function handleSubmit(event) {
        event.preventDefault();
    }
  
  return (

   <Router>
  <div>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="userName" >
          <FormLabel >userName</FormLabel >
          <FormControl
            autoFocus
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="podCastUrl" bsSize="large">
          <FormLabel>Enter Your Your URL</FormLabel>
          <FormControl
            value={podCastUrl}
            onChange={e => setPodCastUrl(e.target.value)}
            type="text"
          />
        </FormGroup>

        <Button block onClick={()=>createProfile()} type="submit">
          Edit Profile
        </Button>
      </form>
       <Route path = "/voiceblastmain" component = {VoiceBlastMain} />
    </div>
    </div>
    </Router>
  );
}

