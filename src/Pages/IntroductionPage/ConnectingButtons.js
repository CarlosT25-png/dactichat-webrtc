import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowForward } from 'react-icons/io5';
import { FiHash } from "react-icons/fi";
import { getRoomExists } from "../../util/api";
import styles from "./ConnectingButtons.module.css";
import { useDispatch } from "react-redux";
import { roomActions } from "../../store/store";

const ConnectingButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  const pushToJoinRoomPage = () => {
    navigate("/join-room");
  };

  const pushToJoinRoomPageAsHost = () => {
    navigate("/join-room?host=true");
  };

  

  const onInputRoomIdChange = ev => {
    setRoomId(ev.target.value);
  }

  const onJoinRoom = async ev => {
    ev.preventDefault();
    dispatch(roomActions.setIdentity('Carlos'));
    dispatch(roomActions.setIsRoomHost(false));
    await joinRoom();
  }

  const joinRoom = async () => {
    const responseMessage = await getRoomExists(roomId);

    const { roomExists, full } = responseMessage;

    if(roomExists){
      if(full){
        console.log('La sala esta full');
      } else {
        console.log(responseMessage);
        dispatch(roomActions.setRoomId(roomId))
        navigate('/room');
      }
    } else {
      console.log('No se ha encontrado la reunión');
    }
  }


  const onCreateRoom = () => {
    dispatch(roomActions.setIdentity('Carlos'));
    dispatch(roomActions.setIsRoomHost(true));
    navigate('/room')
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          <form className={styles.join}>
            <label className={styles.label} htmlFor="roomId">Únete a una sala</label>
            <div>
              <div className={styles['input-container']}>
                <FiHash className={styles.hash} />
                <input className={styles.input} onChange={onInputRoomIdChange} id="roomId" placeholder="Código de sala" />
              </div>
              <button onClick={onJoinRoom} className={styles.btnJoin}><IoArrowForward className={styles.joinArrow} /></button>
            </div>
          </form>
          <div className={styles.divider}></div>
          <form className={styles['form-crear']}>
            <label className={styles.label} >Ó crea una sala</label>
            <div className={styles.btnCrear} onClick={onCreateRoom}><span>Crear Sala</span></div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConnectingButtons;
