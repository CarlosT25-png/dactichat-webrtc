import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { roomActions } from '../../store/store';
import './JoinRoomPage.css';

const JoinRoomPage = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  let location = useLocation();
  console.log(search);

  useEffect(() => {
    console.log('a' + search);
    const isRoomHost = new URLSearchParams(search).get('host');
    console.log(isRoomHost);

    if(isRoomHost) {
      dispatch(roomActions.setIsRoomHost(true));
    }
  }, [location])

  return (
    <div className='join_room_page_container'>
      <div className='join_room_page_panel'>

      </div>
    </div>
  );
};


export default JoinRoomPage;