import React, {useState} from 'react';
import { BrowserRouter as Router, Route, useHistory  } from "react-router-dom";


export default function VoiceBlastMain(props) {
   const[userView, setUserView] = useState();

   
  return props.userView?(

    <div>



    </div>
  ):(
    <div>



    </div>
  )
}
