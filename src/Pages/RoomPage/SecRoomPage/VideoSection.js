import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { videosActions } from '../../../store/store';
import streamVideos from '../../../util/streams';
import VideoControls from './VideoControls';
import VideoPlayer from './VideoPlayer';
import styles from './VideoSection.module.css';
import './Controlsbuttons/Buttons.css'

const testObj = [
  {
    identity: 'Carlos Torres',
    srcObjecto: 'https://archive.org/download/RT_20200115_033000_Documentary/RT_20200115_033000_Documentary.mp4?t=1140/1200&exact=1&ignore=x.mp4'
  },
  {
    identity: 'Carlos Torres',
    srcObjecto: 'https://archive.org/download/RT_20200115_033000_Documentary/RT_20200115_033000_Documentary.mp4?t=1140/1200&exact=1&ignore=x.mp4'
  },
  {
    identity: 'Carlos Torres',
    srcObjecto: 'https://archive.org/download/RT_20200115_033000_Documentary/RT_20200115_033000_Documentary.mp4?t=1140/1200&exact=1&ignore=x.mp4'
  },
  {
    identity: 'Carlos Torres',
    srcObjecto: 'https://archive.org/download/RT_20200115_033000_Documentary/RT_20200115_033000_Documentary.mp4?t=1140/1200&exact=1&ignore=x.mp4'
  },
  
]
let fun;

const VideoSection = () => {
  // const [classGrid, setClassGrid] = useState('grid-1');

  // const [videos, setVideos] = useState([...streamVideos]);

  // useEffect(() => {
  //   setVideos(...streamVideos)
  // }, [streamVideos])

  // useEffect(() => {
  //   if(videos.length === 1){
  //     setClassGrid(styles['grid-1']);
  //   }else if(videos.length >= 2){
  //     setClassGrid(styles['grid-3-4'])
  //   }else{
  //     setClassGrid(styles['grid-3-4']);
  //   }
  // }, [videos])

  return (
    <div className={styles['video-container']}>
      <div id='video-composicion' className={styles['video-composicion'] + ' ' }>
        {/* {videos.map((item, idx) => {
          return (
            <VideoPlayer identity={item.identity} srcObject={item.srcObject} muted={item.muted} socketId={item.socketId ? item.socketId : ''}/>
          )
        })} */}
      </div>
      <div className={styles['video-controls']}>
          <VideoControls />
      </div>
    </div>
  );
}

export const updateVideo = (obj) => {
  fun(obj);
};
export default VideoSection;