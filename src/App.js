import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import IntroductionPage from './Pages/IntroductionPage/IntroductionPage';
import JoinRoomPage from './Pages/JoinRoomPage/JoinRoomPage';
import Login from './Pages/Login/Login';
import RoomPage from './Pages/RoomPage/RoomPage';
import { connectWithSocketIOServer } from './util/wss';
import './index.css';
import SecRoomPage from './Pages/RoomPage/SecRoomPage';
import Register from './Pages/Register/Register';
import Landing from './Pages/Landing/Landing';

function App() {
  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/connect' element={<IntroductionPage />} />
        <Route path='/join-room' element={<JoinRoomPage />} />
        <Route path='/room' element={<SecRoomPage />} />
        <Route path='/' element={<Landing />} />
        <Route path='*' element={<Landing />} />
      </Routes>
  );
}

export default App;
