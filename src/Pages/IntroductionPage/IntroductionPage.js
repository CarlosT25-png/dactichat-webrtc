import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../store/store";
import logo from "../../images/LOGODACTI.png";
import meetingPic from "../../images/meeting.webp";
import ConnectingButtons from "./ConnectingButtons";
import styles from "./IntroductionPage.module.css";
import "./IntroductionPage.css";

const IntroductionPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(roomActions.setIsRoomHost(false));
  }, []);


  return (
    <>
      <div className={styles["overlay-container"]}>
        <div className={styles.container}>
          <div>
            <img className={styles.logo} src={logo} alt='Logo de dactichat' />
            <ConnectingButtons />
          </div>
          <div>
            <img
              className={styles.image}
              src={meetingPic}
              alt="Reunion de colegas"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroductionPage;
