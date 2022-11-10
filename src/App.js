import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import IntroductionPage from './Pages/IntroductionPage/IntroductionPage';
import JoinRoomPage from './Pages/JoinRoomPage/JoinRoomPage';
import RoomPage from './Pages/RoomPage/RoomPage';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/join-room'>
          <JoinRoomPage />
        </Route>
        <Route path='/room'>
          <RoomPage />
        </Route>
        <Route path='/'>
          <IntroductionPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
