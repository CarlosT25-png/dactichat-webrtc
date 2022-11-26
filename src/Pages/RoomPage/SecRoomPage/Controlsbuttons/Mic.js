import { useState } from 'react';
import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai';
import { toggleMic } from '../../../../util/webRTCHandler';
import './Buttons.css';

const Mic = () => {
  const [isMuted, setIsMuted] = useState(false);

  const handleMicButtonPressed = () => {
    toggleMic(isMuted);
    setIsMuted(state => !state);
  }

  return (
    <div className='btn-normal' onClick={handleMicButtonPressed}>
      {!isMuted && <AiOutlineAudio />}
      {isMuted && <AiOutlineAudioMuted className='color-red' />}
    </div>
  );
}

export default Mic;