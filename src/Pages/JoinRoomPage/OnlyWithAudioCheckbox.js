import React, { useState } from 'react';
import CheckImg from '../../images/check.png';

const OnlyWithAudioCheckbox = ({setConnectOnlyWithAudio, ConnectOnlyWithAudio}) => {
  const [connectWithAudio, setConnectWithAudio] = useState(ConnectOnlyWithAudio);
  const handleConnectionTypeChange = () => {
    setConnectOnlyWithAudio(!ConnectOnlyWithAudio);
    setConnectWithAudio(state => !state);
  }

  return (
    <div className='checkbox_container'>
      <div className='checkbox_connection' onClick={handleConnectionTypeChange}>
        {connectWithAudio && <img className='checkbox_image' src={CheckImg} alt='Checkbox logo' />}
      </div>
      <p className='checkbox_container_paragraph'>Only audio</p>
    </div>
  );
};

export default OnlyWithAudioCheckbox;