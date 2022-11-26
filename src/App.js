import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import IntroductionPage from './Pages/IntroductionPage/IntroductionPage';
import JoinRoomPage from './Pages/JoinRoomPage/JoinRoomPage';
import RoomPage from './Pages/RoomPage/RoomPage';
import { connectWithSocketIOServer } from './util/wss';
import './index.css';
import SecRoomPage from './Pages/RoomPage/SecRoomPage';

function App() {
  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
      <Routes>
        <Route path='/' element={<IntroductionPage />} />
        <Route path='/join-room' element={<JoinRoomPage />} />
        <Route path='/room' element={<SecRoomPage />} />
      </Routes>
  );
}

export default App;
