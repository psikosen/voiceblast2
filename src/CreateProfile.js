import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap"; 
import { API, graphqlOperation, Storage  } from "aws-amplify";
import * as queries from './src/graphql/queries';
import * as mutations from './src/graphql/mutations';
import { AmplifySignOut } from '@aws-amplify/ui-react';

export default function CreateProfile(props) {
   const [userName, setUserName] = useState("");
   const [firstName, setfirstName] = useState("");
   const [lastName, setlastName] = useState("");
   const [vburl, setVburl] = useState("");
   const [userid, setUserid] = useState(props.location.state.usrid);
   const [profileImg, setprofileImg] = useState('');
   const [tempprofileImg, settempprofileImg] = useState('');
  
   const history = useHistory();

   useEffect(()=>{
       // Query using a parameter
         getUsers();

        return ()=>{
           console.log(userid);
        }
   },[userid]);
    
   async function getUsers(){
      if(userid !== null){

        const oneUser = await API.graphql(graphqlOperation(queries.getVbuser , { vbuid: userid}));
        console.log(oneUser);
        if(oneUser.data.getVbuser !== null){
          let usrObj = oneUser.data.getVbuser;
          let usrnm = usrObj.vbuusername;
          let usrurl = usrObj.vbuurl;
          let usrfn = usrObj.vbufirstname;
          let usrln = usrObj.vbulastname;
          let usrimg = usrObj.vbuimg;
          
          setUserid(usrObj.vbuid);

          if(usrnm){
             setUserName(usrnm);  
          }
          
          if(usrurl){ 
             setVburl(usrurl);
          }

          if(usrfn){
            setfirstName(usrfn);
          }

          if(usrln){
            setlastName(usrln);
          }
          if(usrimg){
           Storage.get(usrimg)
              .then(result =>{
                console.log(result);
                setprofileImg(result);
              }).catch(err => console.log(err));
          }
         
        }
      }
   }

    async function updateProfile(){
      if(validateForm());

      Storage.put(`${userid}.png`,tempprofileImg)
          .then ((result) =>{
            console.log(result);
            const profileUpdate = {
                  vbuid:userid,  
                  vbuusername: userName,
                  vbufirstname: firstName,
                  vbulastname: lastName,
                  vbuurl: vburl,
                  vbuimg: result.key
                };
                 API.graphql(graphqlOperation(mutations.updateVbuser, {input: profileUpdate})).then((a)=>{
                     console.log(a);
                });

             Storage.get(result.key)
              .then(result =>{
                console.log(result);
                setprofileImg(result);
              }).catch(err => console.log(err));
           }
          ) .catch(err => console.log(err));

     
   }


    async function validateForm(){
        if (userName !== '' && vburl !== ''){
            return true;
        }

        return false;
    }
   
    function handleSubmit(event) {
        event.preventDefault();
    }
   
   function goToProfile(){
       if(validateForm())
         history.push('/vbm',{username:userName,
                              vburl:vburl,
                              profileImg:profileImg,
                              userid:userid});
   }
  
   async function handlePhotos(event) {
    event.preventDefault();
    let files = event.target.files;
    console.log('files');
    console.log(files);

    
    if(files && files.length > 0)
    {
       settempprofileImg(files[0]);


    }

    else{
        console.log("no files selected");
    }
  }

  return (

  <div>
   <AmplifySignOut />
    <div className="Login">
    <form onSubmit={handleSubmit}>
        
       {profileImg === ''? 
        <div>
        <p>No Image</p>
        <FormGroup>
         <FormControl 
           name="image" 
           type="file"  
           onChange={(e)=>handlePhotos(e)} 
         />
        </FormGroup>
        </div>
        :
        <div>
          <img src={profileImg} width={150} height={50}/>
           <FormGroup>
           <FormControl 
             name="image" 
             type="file"  
             onChange={(e)=>handlePhotos(e)} 
           />
          </FormGroup>
         </div> 
        }

        <FormGroup controlId="userName" >
          <FormLabel >userName</FormLabel >
          <FormControl
            autoFocus
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="firstName" >
          <FormLabel >First Name</FormLabel >
          <FormControl
            autoFocus
            type="text"
            value={firstName}
            onChange={e => setfirstName(e.target.value)}
          />
        </FormGroup>

         <FormGroup controlId="lastName" >
          <FormLabel >Last Name</FormLabel >
          <FormControl
            autoFocus
            type="test"
            value={lastName}
            onChange={e => setlastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="podCastUrl" bsSize="large">
          <FormLabel>Enter Your Website URL</FormLabel>
          <FormControl
            value={vburl}
            onChange={e => setVburl(e.target.value)}
            type="text"
          />
        </FormGroup>

          <Button block onClick={()=>updateProfile()} type="submit">
          Update Profile
          </Button>
          <Button onClick={()=>goToProfile()}> Voice Blast Main</Button>
      </form>
    </div>
    </div>
  );
}

