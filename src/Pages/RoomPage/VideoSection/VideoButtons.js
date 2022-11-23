import { useSelector } from "react-redux";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import MicButton from "./MicButton";
import SwitchToScreenShareButton from "./SwitchToScreenShareButton";


const VideoButtons = () => {
    const connectOnlyAudio = useSelector(state => state.room.connectOnlyWithAudio );

    return (
        <div className='video_buttons_container'>
            <MicButton />
            {!connectOnlyAudio && <CameraButton />}
            <LeaveRoomButton />
            {!connectOnlyAudio && <SwitchToScreenShareButton />}
        </div>
    );
}

export default VideoButtons;