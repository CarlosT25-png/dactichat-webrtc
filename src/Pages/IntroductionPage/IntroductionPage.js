import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { roomActions } from '../../store/store';
import logo from '../../images/logo.png';
import ConnectingButtons from './ConnectingButtons';
import './IntroductionPage.css';

const IntroductionPage = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(roomActions.setIsRoomHost(false));
  }, [])

  return (
    <div className='introduction_page_container'>
      <div className='introduction_page_panel'>
        <img src={logo} className='introduction_page_image'></img>
        <ConnectingButtons />
      </div>
    </div>
  );
};

export default IntroductionPage;