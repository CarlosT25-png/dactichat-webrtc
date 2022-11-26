
import { useState } from 'react';
import { FiVideo, FiVideoOff } from 'react-icons/fi';
import { toggleCamera } from '../../../../util/webRTCHandler';

const Camera = () => {
  const [isLocalVideoDisabled, setIslocalVideoDisabled] = useState(false);

  const handleCameraButtonPressed = () => {
    toggleCamera(isLocalVideoDisabled);
    setIslocalVideoDisabled(state => !state);
  }

  return (
    <div className='btn-normal' onClick={handleCameraButtonPressed}>
      {isLocalVideoDisabled && <FiVideoOff className='color-red' />}
      {!isLocalVideoDisabled && <FiVideo />}
    </div>
  );
}

export default Camera;