import React, {useState} from 'react';
import { BrowserRouter as Router, Route, useHistory  } from "react-router-dom";
import VoiceBlastMain from './VoiceBlastMain';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import { createUsers, getUsers, updateUsers } from './amplify/backend/api/voiceblast/schema.graphql';
import { API, graphqlOperation  } from "aws-amplify";

export default function CreateProfile(props) {
   const [userName, setUserName] = useState("");
   const [podCastUrl, setPodCastUrl] = useState("");
   const [userid, setUserid] = useState(1);
   const [voiceList,setVoiceList] = useState([]);
    
   async function createProfile(){
      if(props.screen === 'signup'){
        const todo = {id:userid, username: userName, url: podCastUrl };
        await API.graphql(graphqlOperation(createUsers, {input: todo}));
      }else{
       // Query using a parameter
        const oneUser = await API.graphql(graphqlOperation(getUsers, { id: userid }));
        console.log(oneUser);
      }
   }

    async function editProfile(){
     const profileUpdate = {
        id: userid,
        //email:email
        url: podCastUrl
      };

      const updatedTodo = await API.graphql(graphqlOperation(updateUsers, {input: profileUpdate}));

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

        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
       <Route path = "/voiceblastmain" component = {VoiceBlastMain} />
    </div>
    </div>
    </Router>
  );
}

