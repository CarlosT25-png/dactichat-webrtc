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

  return (
    <div className={styles['video-container']}>
      <div id='video-composicion' className={styles['video-composicion'] + ' ' }>
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