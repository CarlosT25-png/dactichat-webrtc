import React, { useState } from "react";

import Switch from "../../../images/switchToScreenSharing.svg";

function SwitchToScreenShareButton(props) {
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const handleScreenShareToggle = () => {
    setIsScreenSharing((state) => !state);
  };

  return (
    <div className="video_button_container">
      <img
        src={Switch}
        onClick={handleScreenShareToggle}
        className="video_button_image"
        alt="Share Screen Ilustration"
      />
    </div>
  );
}

export default SwitchToScreenShareButton;
