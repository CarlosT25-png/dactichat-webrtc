import React, { useState } from "react";
import { toggleCamera } from "../../../util/webRTCHandler";

import Camera from "../../../images/camera.svg";
import CameraOff from "../../../images/cameraOff.svg";

function CameraButton(props) {
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);

  const handlerCameraButtonPressed = () => {
    toggleCamera(isLocalVideoDisabled);
    setIsLocalVideoDisabled((state) => !state);
  };

  return (
    <div className="video_button_container">
      <img
        src={isLocalVideoDisabled ? CameraOff : Camera}
        className="video_button_image"
        onClick={handlerCameraButtonPressed}
      />
    </div>
  );
}

export default CameraButton;
