import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JoinRoomInputs from "./JoinRoomInputs";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import ErrorMessage from './ErrorMessage';
import { roomActions } from "../../store/store";
import JoinRoomButtons from "./JoinRoomButtons";
import { getRoomExists } from "../../util/api";

const JoinRoomContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRoomHost = useSelector(state => state.room.isRoomHost);
  const connectOnlyWithAudio = useSelector(state => state.room.connectOnlyWithAudio);

  const setConnectOnlyWithAudio = () => {
    dispatch(roomActions.setConnectOnlyWithAudio(!connectOnlyWithAudio));
  }
  
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleJoinRoom = async() => {
    dispatch(roomActions.setIdentity(nameValue))
    if(isRoomHost){
      createRoom();
    } else {
      await joinRoom();
    }
  }

  const joinRoom = async () => {
    const responseMessage = await getRoomExists(roomIdValue);

    const { roomExists, full } = responseMessage;

    if(roomExists){
      if(full){
        setErrorMessage('La reunión ha alcanzado el máximo de participantes');
      } else {
        console.log(responseMessage);
        dispatch(roomActions.setRoomId(roomIdValue))
        navigate('/room');
      }
    } else {
      setErrorMessage('No se ha encontrado la reunión');
    }
  }

  const createRoom = () => {
    navigate('/room');
  }

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox
        setConnectOnlyWithAudio={setConnectOnlyWithAudio}
        connectOnlyWithAudio={connectOnlyWithAudio}
      />
      <ErrorMessage errorMessage={errorMessage} />
      <JoinRoomButtons handleJoinRoom={handleJoinRoom} isRoomHost={isRoomHost} />
    </>
  );
};

export default JoinRoomContent;
