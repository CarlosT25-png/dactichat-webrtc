import Peer from "simple-peer";
import { store } from "../store/store";
import { roomActions } from "../store/store";
import { fetchTURNCredentials, getTurnIceServers } from "./turn";
import * as wss from "./wss";

const defaultConstraints = {
  audio: true,
  video: {
    width: "480",
    height: "360",
  },
};

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

let localStream;

//Aqui accedemos a la camara web del usuario con el navigator y nos regresa el stream
export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null,
  onlyAudio
) => {
  await fetchTURNCredentials();

  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      localStream = stream;
      showLocalVideoPreview(localStream);
      store.dispatch(roomActions.setShowOverlay(false)); //Se va el loading spinner
      isRoomHost
        ? wss.createNewRoom(identity, onlyAudio)
        : wss.joinRoom(identity, roomId, onlyAudio); //Si vamos a ser el host del meet, que se crea una sala, sino que se una a una
    })
    .catch((err) => {
      alert(
        "Error, se necesita los permisos para acceder a la cámara y al microfóno"
      );
      console.log(err);
    });
};

let peers = {};
let streams = [];

const getConfiguration = () => {
  const turnIceServers = getTurnIceServers();

  if(turnIceServers){
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        ...turnIceServers
      ],
    };
  } else {
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
  
};

export const prepareNewPeerConnection = (dataReceive) => {
  const { connectUserSocketId, isInitiator } = dataReceive;
  const configuration = getConfiguration();

  peers[connectUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connectUserSocketId].on("signal", (data) => {
    //webRTC offer, webRTC Answer (SDP Info), ICE candidates
    const signalData = {
      signal: data,
      connUserSocketId: connectUserSocketId,
    };
    wss.signalPeerData(signalData);
  });

  peers[connectUserSocketId].on("stream", (stream) => {
    addStream(stream, connectUserSocketId);
    streams = [...streams, stream];
  });
};

export const handlerSignalingData = (data) => {
  //add signaling data to peer connection
  peers[data.connUserSocketId].signal(data.signal);
};

export const removePeerConnection = (data) => {
  const { socketId } = data;
  const videoContainer = document.getElementById(socketId);
  const videoElement = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoElement) {
    const tracks = videoElement.srcObject.getTracks();

    tracks.forEach((t) => t.stop());

    videoElement.srcObject = null;
    videoContainer.removeChild(videoElement);
    videoContainer.parentNode.removeChild(videoContainer);

    if (peers[socketId]) {
      peers[socketId].destroy();
    }
    delete peers[socketId];
  }
};

///////// UI
const showLocalVideoPreview = (stream) => {
  //show local video preview
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");

  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_track_container");

  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  //Para las versiones viejas de firefox, el autoplay no funciona, hay que hacerlo de esta manera
  videoElement.onloadeddata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);

  console.log(store.getState());

  if(store.getState().room.connectOnlyWithAudio) {
    videoContainer.appendChild(getAudioOnlyLabel(store.getState().room.identity));
  }

  videosContainer.appendChild(videoContainer);
};

const addStream = (stream, connUserSocketId) => {
  //display incoming stream
  const videosContainer = document.getElementById("videos_portal");
  const videoContainer = document.createElement("div");
  videoContainer.id = connUserSocketId;

  videoContainer.classList.add("video_track_container");
  videoContainer.style.position = "static";
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  //Para las versiones viejas de firefox, el autoplay no funciona, hay que hacerlo de esta manera
  videoElement.onloadeddata = () => {
    videoElement.play();
  };

  videoElement.addEventListener("click", () => {
    if (videoElement.classList.contains("full_screen")) {
      videoElement.classList.remove("full_screen");
    } else {
      videoElement.classList.add("full_screen");
    }
  });

  videoContainer.appendChild(videoElement);

  //Check if other user connected only with audio
  const participants = store.getState().room.participants;
  console.log(participants);
  const participant = participants.find( p => p.socketId === connUserSocketId);

  if(participant?.onlyAudio){
    videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
  }

  videosContainer.appendChild(videoContainer);
};

const getAudioOnlyLabel = (identity = '') => {
  const labelContainer = document.createElement('div');
  labelContainer.classList.add('label_only_audio_container');

  const label = document.createElement('p');
  label.classList.add('label_only_audio_text');
  label.innerHTML = `Solo audio ${identity}`;
  
  labelContainer.appendChild(label);
  return labelContainer;
};

// --------------- Buttons Logic-----------------

export const toggleMic = (isMuted) => {
  localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
};

export const toggleCamera = (isDisabled) => {
  localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
};

export const toggleScreenShare = (
  isScreenSharingActive,
  screenSharingStream = null
) => {
  if (isScreenSharingActive) {
    switchVideoTracks(localStream);
  } else {
    switchVideoTracks(screenSharingStream);
  }
};

const switchVideoTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};
