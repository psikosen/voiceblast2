import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap"; 
import { API, graphqlOperation, Storage, Auth  } from "aws-amplify";
import * as queries from './../src/graphql/queries';
import * as mutations from './../src/graphql/mutations';
import { AmplifySignOut } from '@aws-amplify/ui-react';

export default function EditProfile(props) {
   const [userName, setUserName] = useState("");
   const [firstName, setfirstName] = useState("");
   const [lastName, setlastName] = useState("");
   const [vburl, setVburl] = useState("");
   const [userid, setUserid] = useState("");
   const [profileImg, setprofileImg] = useState('');
   const [vbubio, setvbubio] = useState('');
   const [tempprofileImg, settempprofileImg] = useState('');
   const [previewImage, setPreviewImage] = useState(''); 
   const [error, setError] = useState("");
  
   const history = useHistory();

   useEffect(()=>{
         getUser();

        return ()=>{console.log(userid)}
   },[userid]);
    
   async function getUser(){
      let userid = sessionStorage.getItem('userId');

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
          let usrbio = usrObj.vbubio;
          
          setUserid(usrObj.vbuid);
          
          sessionStorage.setItem('userId', usrObj.vbuid);

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

          if(usrbio){
            setvbubio(usrbio);
          }


          if(usrimg){
           Storage.get(usrimg)
              .then(result =>{
                console.log(result);
                setPreviewImage(result);
                setprofileImg(result);
              }).catch(err => console.log(err));
          }
         
        }else{
          setError('Please Update Your Profile');
        }
      }
   }

    async function editProfile(){
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
                  vbubio:vbubio,
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
    // add more validation
    async function validateForm(){
        if (valIsNotBlank(userName , 3 , "Please, Enter A User Name")  &&
            valIsNotBlank(vburl, 10 , "Please, Enter A Your URL")    && 
            valIsNotBlank(firstName , 3 , "Please, Enter Your First Name") && 
            valIsNotBlank(lastName ,3, "Please, Enter A Last Name") &&
            valIsNotBlank(vbubio , 10 , "Please, Enter A Your Bio") && 
            valIsNotBlank(profileImg ,3 ,"You have not uploded a photo")){
 

            return true;
        }

        setError("Please Fill In All Required Fields");
        return false;
    }

    function valIsNotBlank(val, len, errMsg){
        if(len > 40){
             setError("Your Bio Cannot Exceed 40 characters");
             return false;
        }

        if(val !== "" && val < len){
          setError(errMsg);
          return false;
        }
        return true
    }
   
    function handleSubmit(e) {
        e.preventDefault();
    }
   
   function goToProfile(){
       if(validateForm())
         history.push('/vbm/${userName}',{userid:userid});
   }
  
   async function handlePhotos(event) {
    event.preventDefault();
    let files = event.target.files;
    //console.log(files);

    if(files && files.length > 0)
    {  
       settempprofileImg(files[0]);
       setPreviewImage(window.URL.createObjectURL(files[0]));
    }

    else{
        console.log("no files selected");
    }
  }

  return (

  <div>

    <div className="Login">
     <h3 style = {{textAlign:'center'}}>Your Profile</h3>
     <p style={{textAlign:'center',color:'red'}}>{error}</p>
    <form onSubmit={handleSubmit}>
     {profileImg === ''? 
        <div>
        <img src={previewImage} width={'100%'} height={150}/> 
        <FormGroup>
         <FormControl 
           name="image" 
           type="file"  
           onChange={(e)=> handlePhotos(e)} 
         />
        </FormGroup>
        </div>
        :
        <div>
          <img src={previewImage} width={'100%'} height={150}/>
           <FormGroup>
           <FormControl 
             name="image" 
             type="file"  
             onChange={(e)=>handlePhotos(e)} 
           />
          </FormGroup>
         </div> 
      }
        <FormGroup controlId="firstName" >
          <FormLabel >First Name:</FormLabel >
          <FormControl
            autoFocus
            type="text"
            value={firstName}
            onChange={e => setfirstName(e.target.value)}
          />
        </FormGroup>

         <FormGroup controlId="lastName" >
          <FormLabel >Last Name:</FormLabel >
          <FormControl
            autoFocus
            type="test"
            value={lastName}
            onChange={e => setlastName(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="userName" >
          <FormLabel >User Name:</FormLabel >
          <FormControl
            autoFocus
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </FormGroup>
     
        <FormGroup controlId="vburl" >
          <FormLabel>Enter Your Website URL:</FormLabel>
          <FormControl
            value={vburl}
            onChange={e => setVburl(e.target.value)}
            type="text"
          />
        </FormGroup>

        <FormGroup controlId="bio" >
          <FormLabel>Bio:</FormLabel>
          <FormControl
            value={vbubio}
            onChange={e => setvbubio(e.target.value)}
            type="text"
          />
        </FormGroup>

         <div style={{ marginLeft:'30%'}}>
          <Button style={{ margin:'2%'}} onClick={()=> editProfile()} type="submit">
             Edit Profile
          </Button>
         </div>
      </form>
    </div>
    </div>
  );
}
