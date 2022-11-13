import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import MicButton from "./MicButton";
import SwitchToScreenShareButton from "./SwitchToScreenShareButton";


const VideoButtons = () => {
    return (
        <div className='video_buttons_container'>
            <MicButton />
            <CameraButton />
            <LeaveRoomButton />
            <SwitchToScreenShareButton />
        </div>
    );
}

export default VideoButtons;