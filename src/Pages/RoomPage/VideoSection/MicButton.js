import React, { useState } from 'react';

import MicLogo from '../../../images/mic.svg';
import MicOffLogo from '../../../images/micOff.svg';

function MicButton(props) {
    const [isMuted, setIsMuted] = useState(false);

    const handleMicButtonPressed = () => {
        setIsMuted(state => !state);
    }

    return (
        <div className="video_button_container">
            <img src={isMuted ? MicOffLogo : MicLogo} onClick={handleMicButtonPressed} className="video_button_image" />
        </div>
    );
}

export default MicButton;