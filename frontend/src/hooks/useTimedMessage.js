import { useRef, useState, useEffect } from "react";



function useTimedMessage(timeInMsec = 3000) {
    const [active, setActive] = useState(false);
  
    const messageShownRef = useRef(false);
  
    useEffect(
        function showSavedMessage() {
          console.debug(
              "useTimedMessage useEffect showSavedMessage", "active=", active);
  
          if (active && !messageShownRef.current) {
            messageShownRef.current = true;
            setTimeout(function removeMessage() {
              setActive(false);
              messageShownRef.current = false;
            }, timeInMsec);
          }
        },
        [active, timeInMsec],
    );
  
    return [active, setActive];
  }
  
  export default useTimedMessage;
  