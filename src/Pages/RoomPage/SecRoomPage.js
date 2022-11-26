import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLocalPreviewAndInitRoomConnection } from "../../util/webRTCHandler";
import VideoSection from "./SecRoomPage/VideoSection";
import Participants from "./SecRoomPage/Participants";
import styles from "./SecRoomPage.module.css";

function SecRoomPage() {
  const { roomId, isRoomHost, identity, showOverlay, connectOnlyWithAudio } =
    useSelector((state) => state.room);

  useEffect(() => {
    toast("Cargando...");
    getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId,
      connectOnlyWithAudio
    );

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
    <>
      <div className={styles["main-container"]}>
        <VideoSection />
        <Participants />
      </div>
      <ToastContainer />
    </>
  );
}

export default SecRoomPage;
