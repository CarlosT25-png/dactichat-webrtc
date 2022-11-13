import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatSection from "./ChatSection/ChatSection.js";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection.js";
import VideoSection from "./VideoSection/VideoSection.js";
import { getLocalPreviewAndInitRoomConnection } from "../../util/webRTCHandler.js";
import RoomLabel from "./RoomLabel.js";

import "./RoomPage.css";
import Overlay from "./Overlay.js";

const RoomPage = () => {
  const { roomId, isRoomHost, identity, showOverlay } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    getLocalPreviewAndInitRoomConnection(isRoomHost, identity, roomId);
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </div>
  );
};

export default RoomPage;
