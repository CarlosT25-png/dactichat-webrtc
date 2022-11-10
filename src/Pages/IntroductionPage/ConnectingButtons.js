import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import ConnectingButton from './ConnectingButton';

const ConnectingButtons = () => {
  const history = useHistory();

  const pushToJoinRoomPage = () => {
    history.replace('/join-room');
  }

  const pushToJoinRoomPageAsHost = () => {
    history.replace('/join-room?host=true');
    console.log('done')
  }

  return (
    <div className='connecting_buttons_container'>
      <Link to='/join-room'>Join Room</Link>
      <ConnectingButton buttonText='Join a meeting' onClickHandler={pushToJoinRoomPage} />
      <ConnectingButton createRoomButton buttonText='Host a meeting' onClickHandler={pushToJoinRoomPageAsHost} />
    </div>
  );
};

export default ConnectingButtons;