
import Abandonar from './Controlsbuttons/Abandonar';
import Dacti from './Controlsbuttons/Dacti';
import Camera from './Controlsbuttons/Camera';
import Mic from './Controlsbuttons/Mic';
import ShareId from './Controlsbuttons/ShareId';
import ShareScreen from './Controlsbuttons/ShareScreen';
import styles from './VideoControls.module.css';

const VideoControls = () => {
  return (
    <div className={styles['main-container']}>
      <div>
       <ShareId />
      </div>
      <div className={styles['btn-state']}>
        <Camera />
        <Mic />
        <ShareScreen />
        <Dacti />
      </div>
      <div>
        <Abandonar />
      </div>
    </div>
  );
}

export default VideoControls;