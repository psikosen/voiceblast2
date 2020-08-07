import React, { useState } from "react";

import useDarkMode from "use-dark-mode";
//import { FcNightLandscape } from "react-icons/fc";
//IoIosCloudyNight
const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);
  const [isDark, setIsDark] = useState(false);
  const [btnText, setBtnText] = useState("☀");

  function switchMode() {
    if (!isDark) {
      setIsDark(true);
      darkMode.disable();
      setBtnText("☾");
    } else {
      setIsDark(false);
      darkMode.enable();
      setBtnText("☀");
    }
    console.log(darkMode.disable);
  }
  return (
    <div className="dark-mode-toggle">
      <button type="button" onClick={switchMode}>
        {btnText}
      </button>
    </div>
  );
};

export default DarkModeToggle;
