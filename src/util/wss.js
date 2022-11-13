import io from 'socket.io-client';
import { store } from "../store/store";
import { roomActions } from "../store/store";
import * as WebRTCHandler from './webRTCHandler';

const SERVER = 'http://localhost:5002';

let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io(SERVER);

  socket.on('connect', () => {
    console.log('Connected with socket.io' + socket.id)
  })

  socket.on('room-id', (data) => {
    const { roomId } = data;
    store.dispatch(roomActions.setRoomId(roomId));
  });

  socket.on('room-update', (data) => {
    const { connectedUsers } = data;
    store.dispatch(roomActions.setParticipants(connectedUsers));
  });

  socket.on('conn-prepare', data => {
    const { connUserSocketId } = data;

    WebRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
  })
}

export const createNewRoom = (identity) => {
  //emite un evento al servidor que dice que queremos crear una sala
  const data = {
    identity
  };

  socket.emit('create-new-room', data);
}

export const joinRoom = (identity, roomId) => {
  const data = {
    roomId,
    identity
  }

  socket.emit('join-room', data);
}