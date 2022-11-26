import { useRef } from 'react';
import styles from './VideoPlayer.module.css';

const VideoPlayer = ({identity, srcObject, muted, socketId = ''}) => {
  const videoEl = document.createElement('video');
  videoEl.srcObject = srcObject;
  videoEl.autoplay = true;

  return (
    <div className={styles['video-container']}>
      {videoEl}
      <div className={styles['tag-container']}>
        <span className={styles['tag-name']}>{identity}</span>
      </div>
    </div>
  );
}

export default VideoPlayer;