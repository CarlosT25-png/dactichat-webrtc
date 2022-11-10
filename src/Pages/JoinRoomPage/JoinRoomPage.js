import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { roomActions } from '../../store/store';
import JoinRoomTitle from './JoinRoomTitle';
import './JoinRoomPage.css';
import JoinRoomContent from './JoinRoomContent';

const JoinRoomPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isRoomHostLocal = searchParams.get('host')
  const [isRoomHost, setIsRoomHost] = useState();

  useEffect(() => {
    setIsRoomHost(searchParams.get('host'));
    if(isRoomHostLocal) {
      dispatch(roomActions.setIsRoomHost(true));
    }
  }, [])

  return (
    <div className='join_room_page_container'>
      <div className='join_room_page_panel'>
        <JoinRoomTitle isRoomHost={isRoomHost}/>
        <JoinRoomContent />
      </div>
    </div>
  );
};


export default JoinRoomPage;