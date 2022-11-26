import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatSection from "./ChatSection/ChatSection.js";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection.js";
import VideoSection from "./VideoSection/VideoSection.js";
import { getLocalPreviewAndInitRoomConnection } from "../../util/webRTCHandler.js";
import RoomLabel from "./RoomLabel.js";
import "./RoomPage.css";
import Overlay from "./Overlay.js";

const RoomPage = () => {
  const navigate = useNavigate();

  const { roomId, isRoomHost, identity, showOverlay, connectOnlyWithAudio } = useSelector(
    (state) => state.room
  );

  console.log(roomId)
  console.log(isRoomHost)

  useEffect(() => {

    getLocalPreviewAndInitRoomConnection(isRoomHost, identity, roomId, connectOnlyWithAudio);

    // if(!isRoomHost && !roomId){
    //   const siteUrl = window.location.origin;
    //   window.location.href = siteUrl;
    //   console.log('Se regreso')
    //   console.log(isRoomHost)
    //   console.log(roomId)
    // } else {
    //   getLocalPreviewAndInitRoomConnection(isRoomHost, identity, roomId, connectOnlyWithAudio);
    // }
  }, []);

  return (
    <div className="room_container">
      <VideoSection />
      <ParticipantsSection />
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </div>
  );
};

export default RoomPage;
