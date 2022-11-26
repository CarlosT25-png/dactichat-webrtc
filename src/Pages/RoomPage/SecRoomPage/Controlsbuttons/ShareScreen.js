import { useState } from 'react';
import { FiAirplay } from 'react-icons/fi';
import { toggleScreenShare } from '../../../../util/webRTCHandler';
import './Buttons.css';

const constraints = {
  audio: false,
  video: true
}

const ShareScreen = () => {
  const [isScreenSharingAcive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  const handlerScreenShareToggle = async () => {
    if(!isScreenSharingAcive){
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints)
      } catch (error) {
        console.log('Ocurrio un error cuando se trataba de compartir pantalla')
        console.log(error)
      }
      if(stream){
        setScreenSharingStream(stream);

        toggleScreenShare(isScreenSharingAcive, stream);
        setIsScreenSharingActive(true);
      }
    }else{
      //cambiar por video track webcam
      toggleScreenShare(isScreenSharingAcive);
      setIsScreenSharingActive(false);

      //Detener el screen share stream
      screenSharingStream.getTracks().forEach(t => t.stop());
      setScreenSharingStream(null);
    }
  }

  const clase = isScreenSharingAcive ? 'color-primary' : '';

  return (
    <div className={`btn-normal ${clase}`} onClick={handlerScreenShareToggle}>
      <FiAirplay />
    </div>
  );
}

export default ShareScreen;