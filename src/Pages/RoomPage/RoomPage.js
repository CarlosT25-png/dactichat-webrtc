import React, { useEffect, useState  } from "react";
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

  let authToken = sessionStorage.getItem('Auth Token');
  const [loggeadoAuth, setLoggeadoAuth] = useState(authToken?.length >= 1 ? true : false);
  const [loggeadoIden, setLoggeadoIdent] = useState(identity?.length >= 1 ? true : false);

  useEffect(() => {
    setLoggeadoAuth(authToken?.length >= 1 ? true : false)
    setLoggeadoIdent(identity?.length >= 1 ? true : false)
  }, [identity, authToken])

  useEffect(() => {
    if(!loggeadoAuth && !loggeadoIden){
      navigate('/login')
    }
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
