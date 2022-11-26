import Peer from "simple-peer";
import { store } from "../store/store";
import { roomActions, videosActions } from "../store/store";
import { fetchTURNCredentials, getTurnIceServers } from "./turn";
import { updateVideo } from "./streams";
import * as wss from "./wss";

let mediasStream = [];

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
      console.log("holaaa");
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

  if (turnIceServers) {
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        ...turnIceServers,
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

  console.log('remove peer')
  console.log(socketId);

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

  console.log(store.getState().room)

  if(store.getState().room.participants.length <= 2 ){
    const videosContainer = document.getElementById("videos_portal");
    console.log('Agregando nueva clase 22')
    console.log(videoContainer.classList.contains('grid-3-4'))
    videoContainer.classList?.remove('grid-3-4');
    videosContainer.classList.add('grid-1');
  }  
};

///////// UI
const showLocalVideoPreview = (stream) => {
  //show local video preview
  // console.log('Se esta mostrando')
  // const videoContainer = document.getElementById('videos_portal');
  // videoContainer.classList.add('grid-1')

  // const videoFrame = document.createElement('div');
  // videoFrame.classList.add('video-container')

  // const videoElement = document.createElement('video');
  // videoElement.autoplay = true;
  // videoElement.muted = true;
  // videoElement.srcObject = stream;
  // console.log(stream)

  // videoFrame.appendChild(videoElement);

  // const tagContainer = document.createElement('div');
  // tagContainer.classList.add('tag-container');

  // const tagName = document.createElement('span');
  // tagName.classList.add('tag-name');
  // tagName.textContent = 'Carlos T'

  // tagContainer.appendChild(tagName);

  // videoFrame.appendChild(tagContainer);
  // videoContainer.appendChild(videoFrame);
  // updateVideo({
  //   muted: true,
  //   srcObject: stream,
  //   identity: store.getState().room.identity
  // })
  // store.dispatch(videosActions.setVideos({
  //   muted: true,
  //   srcObject: stream,
  //   identity: store.getState().room.identity
  // })); //Se va el loading spinner
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");
  videosContainer.classList.add('grid-1')

  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container");

  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  console.log(store.getState().room.roomId);

  //Para las versiones viejas de firefox, el autoplay no funciona, hay que hacerlo de esta manera
  videoElement.onloadeddata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);

  const tagContainer = document.createElement('div');
  tagContainer.classList.add('tag-container');

  const tagName = document.createElement('span');
  tagName.classList.add('tag-name');
  tagName.textContent = store.getState().room.identity;

  tagContainer.appendChild(tagName);

  videoContainer.appendChild(tagContainer);

  console.log(store.getState());

  if (store.getState().room.connectOnlyWithAudio) {
    videoContainer.appendChild(
      getAudioOnlyLabel(store.getState().room.identity)
    );
  }

  videosContainer.appendChild(videoContainer);
};

const addStream = (stream, connUserSocketId) => {

  const videosContainers = document.getElementById("videos_portal");
  videosContainers.classList.add("videos_portal_styles");
  if(videosContainers.classList.contains('grid-1')){
    videosContainers.classList.remove('grid-1');
  }
  videosContainers.classList.add('grid-3-4')

  const videoContainers = document.createElement("div");
  videoContainers.classList.add("video-container");
  videoContainers.id = `${connUserSocketId}`

  const videoElements = document.createElement("video");
  videoElements.autoplay = true;
  videoElements.muted = false;
  videoElements.srcObject = stream;
  videoElements.id = `${connUserSocketId}-video`;

  //Para las versiones viejas de firefox, el autoplay no funciona, hay que hacerlo de esta manera
  videoElements.onloadeddata = () => {
    videoElements.play();
  };

  videoContainers.appendChild(videoElements);

  const tagContainer = document.createElement('div');
  tagContainer.classList.add('tag-container');

  //Obtener el identity
  const participantes = store.getState().room.participants;
  const participante = participantes.find((p) => p.socketId === connUserSocketId);


  const tagName = document.createElement('span');
  tagName.classList.add('tag-name');
  tagName.textContent = participante.identity;

  tagContainer.appendChild(tagName);

  videoContainers.appendChild(tagContainer);
  videosContainers.appendChild(videoContainers)

  // //display incoming stream
  // const videosContainer = document.getElementById("videos_portal");
  // const videoContainer = document.createElement("div");
  // videoContainer.id = connUserSocketId;

  // videoContainer.classList.add("video_track_container");
  // videoContainer.style.position = "static";
  // const videoElement = document.createElement("video");
  // videoElement.autoplay = true;
  // videoElement.srcObject = stream;
  // videoElement.id = `${connUserSocketId}-video`;

  // //Para las versiones viejas de firefox, el autoplay no funciona, hay que hacerlo de esta manera
  // videoElement.onloadeddata = () => {
  //   videoElement.play();
  // };

  // videoElement.addEventListener("click", () => {
  //   if (videoElement.classList.contains("full_screen")) {
  //     videoElement.classList.remove("full_screen");
  //   } else {
  //     videoElement.classList.add("full_screen");
  //   }
  // });

  // videoContainer.appendChild(videoElement);

  // //Check if other user connected only with audio
  // const participants = store.getState().room.participants;
  // console.log(participants);
  // const participant = participants.find((p) => p.socketId === connUserSocketId);

  

  // if(participant?.onlyAudio){
  //   videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
  // }

  // videosContainer.appendChild(videoContainer);
};

const getAudioOnlyLabel = (identity = "") => {
  const labelContainer = document.createElement("div");
  labelContainer.classList.add("label_only_audio_container");

  const label = document.createElement("p");
  label.classList.add("label_only_audio_text");
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
