import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IntroductionPage from './Pages/IntroductionPage/IntroductionPage';
import JoinRoomPage from './Pages/JoinRoomPage/JoinRoomPage';
import RoomPage from './Pages/RoomPage/RoomPage';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path='/' element={<IntroductionPage />} />
        <Route path='/join-room' element={<JoinRoomPage />} />
        <Route path='/room' element={<RoomPage />} />
      </Routes>
  );
}

export default App;
