import React, { useState } from "react";
import { toggleScreenShare } from "../../../util/webRTCHandler";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";

import Switch from "../../../images/switchToScreenSharing.svg";

const constraints = {
  audio: false,
  video: true
}

function SwitchToScreenShareButton(props) {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  const handleScreenShareToggle = async () => {
    if(!isScreenSharingActive){
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
        console.log(stream);
      } catch (err) {
        console.log('Error ocurred when trying to get an access to screen share stream');
        console.log(err);
      }
      if(stream){
        setScreenSharingStream(stream);

        toggleScreenShare(isScreenSharingActive, stream);
        setIsScreenSharingActive(true);
        //ejecutar la funcion para cambiar de video track que estamos enviando a los otros usuarios
      }
    } else {
      //Cambiar por video track de la webcam
      toggleScreenShare(isScreenSharingActive);
      setIsScreenSharingActive(false);

      //Detener el screen share stream
      screenSharingStream.getTracks().forEach(t => t.stop());
      setScreenSharingStream(null);
    }
    //setIsScreenSharingActive((state) => !state);
  };

  return (
    <>
      <div className="video_button_container">
      <img
        src={Switch}
        onClick={handleScreenShareToggle}
        className="video_button_image"
        alt="Share Screen Ilustration"
      />
      </div>
      {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
}

export default SwitchToScreenShareButton;
