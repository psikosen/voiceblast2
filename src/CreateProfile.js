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
   const [userNameData, setuserNameData] = useState("");
   
   const [podCastUrl, setPodCastUrl] = useState("");
   const [userid, setUserid] = useState(1);
   const [voiceList,setVoiceList] = useState([]);
   
   useEffect(()=>{
       // Query using a parameter
        getUsers();
   },[]);
    
   async function getUsers(){
        const oneUser = await API.graphql(graphqlOperation(queries.getusers , { userid: '1', username:'dasd' }));
        console.log(oneUser);
        if(oneUser.data.getUsers !== null){
          setuserNameData(oneUser.data.userid.username);
          setUserName(oneUser.data.userid.username);
          setPodCastUrl(oneUser.data.userid.podCastURL);
          setUserid(oneUser.data.userid.id);
        }
   }

   async function createProfile(){
        const profileCreated = {
         username:userName.toString(),
         podCastURL: podCastUrl.toString()
       };
        await API.graphql(graphqlOperation(mutations.createusers, {input: profileCreated})).then((a)=>{
            console.log(a);
            setUserid(a.data.createUsers.id);
        });
   }

    async function updateProfile(){
     const profileUpdate = {
        'username':userName.toString(),
        'podCastURL': podCastUrl.toString()
      };
      /*const updatedTodo = await*/ 
        await API.graphql(graphqlOperation(mutations.updateusers, {input: profileUpdate})).then((a)=>{
            console.log(a);
        });
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
        {userNameData === ''?
          <Button block onClick={()=>createProfile()} type="submit">
          Create Profile
          </Button>:
          <Button block onClick={()=>updateProfile()} type="submit">
          Update Profile
          </Button>
       }
      </form>
       <Route path = "/voiceblastmain" component = {VoiceBlastMain} />
    </div>
    </div>
    </Router>
  );
}

