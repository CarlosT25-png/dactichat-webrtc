import React from 'react';

const JoinRoomTitle = ({ isRoomHost }) => {
  const titleText = isRoomHost ? 'Crear una reunión' : 'Unirse a una Reunión'
  return (
    <p className='join_room_title'>
      {titleText}
    </p>
  );
};

export default JoinRoomTitle;