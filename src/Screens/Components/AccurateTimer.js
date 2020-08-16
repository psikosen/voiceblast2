import React, { useState, useEffect } from "react";

export default function Timer({timeObj, stopRecording}) {
  const { initialMinute = 0, initialSeconds = 0 } = timeObj;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
      if(seconds === 0){
         stopRecording();
      }

    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, seconds, initialMinute, initialSeconds, setSeconds, setMinutes]);

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
      <div   style={{ border: "2px solid red", width:'250%', height:'100%'}}>
        <div
          style={{
            fontWeight: "bold",
            textShadowOffset: { width: 1.5, height: 2 },
            textShadowColor: "purple",
            letterSpacing: 4,
            position:"relative",
            fontFamily: "Roboto",
            fontSize: "120px",
            marginBottom: "80%", 
            borderRadius: 40,
            borderWidth: 6,
            borderRadius:80,
            borderColor: "green",
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 1.58,
            shadowRadius: 2.41,

          }}
        >
          {minutes < 1  ? `${seconds}`:seconds}
        </div>
       </div>
      )}
    </div>
  );
}


//{minutes}:
// timer on screen,  
//add recording wave,
// when timer is done or user press done
// Make timer vanish and switch to Title creation pop up.
// No play button, only after done aka live.