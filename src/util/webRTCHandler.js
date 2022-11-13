import Peer from 'simple-peer';
import { store } from "../store/store";
import { roomActions } from "../store/store";
import * as wss from './wss';

const defaultConstraints = {
  audio: true,
  video: true,
};

let localStream;

//Aqui accedemos a la camara web del usuario con el navigator y nos regresa el stream
export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null
) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      localStream = stream;
      showLocalVideoPreview(localStream);
      store.dispatch(roomActions.setShowOverlay(false)); //Se va el loading spinne
      isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId); //Si vamos a ser el host del meet, que se crea una sala, sino que se una a una
    })
    .catch((err) => {
      alert(
        "Error, se necesita los permisos para acceder a la cámara y al microfóno"
      );
      console.log(err);
    });
};

const showLocalVideoPreview = (stream) => {
  //show local video preview
};

let peers = {

}

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
  }
}

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  })
}