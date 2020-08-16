import React, { useState }  from 'react';
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Amplify, { Auth,  } from 'aws-amplify';

export default function VoiceRecorderScreen() {
  const history = useHistory();

  async function handleSubmit(event) {
   return false;
  }
 
 function validateForm() {

    return false;
  }

  return (
      <div>

      </div>
  );
}