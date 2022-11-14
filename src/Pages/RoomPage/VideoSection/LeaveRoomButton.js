import React from "react";

function LeaveRoomButton(props) {
  const handleRoomLeave = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  return (
    <div className="video_button_container">
      <button className="video_button_end" onClick={handleRoomLeave}>
        Abandonar
      </button>
    </div>
  );
}

export default LeaveRoomButton;
