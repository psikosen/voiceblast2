import React from 'react';

function InitLogin() {
  return (
     <div>
      <h1>Voice Blast</h1>
      <button>
         <a href = "/signup"> Sign Up</a>
      </button>
      <p>Already A Creator ?
          <a href = "/login" style={{textDecoration: 'underline'}}> Login Here </a> 
      </p>
     </div>

       
  );
}

export default InitLogin;

//
//        