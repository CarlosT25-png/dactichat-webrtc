import io from "socket.io-client";
import { store } from "../store/store";
import { roomActions } from "../store/store";
import { handlerSignalingData, prepareNewPeerConnection, removePeerConnection } from "./webRTCHandler";

const SERVER = "http://3.85.237.83:8080";

let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io(SERVER);

  socket.on("connect", () => {
    console.log("Connected with socket.io " + socket.id);
  });

  socket.on("room-id", (data) => {
    const { roomId } = data;
    store.dispatch(roomActions.setRoomId(roomId));
  });

  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(roomActions.setParticipants(connectedUsers));
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;

    const dataSend = {
      connectUserSocketId: connUserSocketId,
      isInitiator: false
    }

    prepareNewPeerConnection(dataSend);

    //emit un event que informal al usuario que se acaba de unir que se prepare para incoming connections
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-signal", (data) => {
    handlerSignalingData(data);
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    const dataSend = {
      connectUserSocketId: connUserSocketId,
      isInitiator: true
    }
    prepareNewPeerConnection(dataSend);
  });

  socket.on('user-disconnected', data => {
    removePeerConnection(data);
  })
};

export const createNewRoom = (identity, onlyAudio) => {
  //emite un evento al servidor que dice que queremos crear una sala
  const data = {
    identity,
    onlyAudio
  };

  socket.emit("create-new-room", data);
};

export const joinRoom = (identity, roomId, onlyAudio) => {
  const data = {
    roomId,
    identity,
    onlyAudio
  };
  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
