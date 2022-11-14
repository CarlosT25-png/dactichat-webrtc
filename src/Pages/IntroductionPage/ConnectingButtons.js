import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectingButton from './ConnectingButton';

const ConnectingButtons = () => {
  const navigate = useNavigate();

  const pushToJoinRoomPage = () => {
    navigate('/join-room');
  }

  const pushToJoinRoomPageAsHost = () => {
    navigate('/join-room?host=true');
  }

  return (
    <div className='connecting_buttons_container'>
      <ConnectingButton buttonText='Unirse a una Reunión' onClickHandler={pushToJoinRoomPage} />
      <ConnectingButton createRoomButton buttonText='Crear reuniòn' onClickHandler={pushToJoinRoomPageAsHost} />
    </div>
  );
};

export default ConnectingButtons;