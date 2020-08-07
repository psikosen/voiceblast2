import React, { useState, useEffect } from "react";

export default function Timer(props) {
  const { initialMinute = 0, initialSeconds = 0 } = props;
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
    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, seconds, initialMinute, initialSeconds, setSeconds, setMinutes]);

  return (
    <div
      style={{
        margin: 1,
        width: "30%",
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 1.58,
        shadowRadius: 2.41,

        elevation: 5
      }}
    >
      {minutes === 0 && seconds === 0 ? null : (
        <div
          style={{
            fontWeight: "bold",
            textShadowOffset: { width: 1.5, height: 2 },
            textShadowColor: "purple",
            borderRadius: 60,
            borderWidth: 6,
            borderColor: "green",
            letterSpacing: 4,
            fontFamily: "Roboto",
            fontSize: "30px",
            margin: "10%"
          }}
        >
          {minutes}:{seconds < 10 ? `${seconds}` : seconds}
        </div>
      )}
    </div>
  );
}
