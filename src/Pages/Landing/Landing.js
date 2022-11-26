import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai'

import styles from "./Landing.module.css";
import logo from "../../images/logoDactiNuevo.webp";
import hero from "../../images/hero.webp";
import fotoValores from '../../images/valores.jpeg'
import fotoVision from '../../images/vision.webp';
import logoDacti from '../../images/logoDactiNuevo.webp';

const Landing = () => {
  const identity = useSelector((state) => state.room.identity);
  let authToken = sessionStorage.getItem("Auth Token");
  const [loggeadoAuth, setLoggeadoAuth] = useState(
    authToken?.length >= 1 ? true : false
  );
  const [loggeadoIden, setLoggeadoIdent] = useState(
    identity?.length >= 1 ? true : false
  );

  useEffect(() => {
    setLoggeadoAuth(authToken?.length >= 1 ? true : false);
    setLoggeadoIdent(identity?.length >= 1 ? true : false);
  }, [identity, authToken]);

  let navigate = useNavigate();
  const onClickIngresar = () => {
    if (identity && authToken) {
      navigate("/connect");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles["header"]}>
        <img className={styles.logo} src={logo} alt="Logo dactichat" />
        <div>
          <a className={styles["active"]}>Inicio</a>
          <a>Nosotros</a>
          <a>Planes</a>
          <a>Reseñas</a>
          <a className={styles["btn-ingresar"]} onClick={onClickIngresar}>
            {loggeadoAuth && loggeadoIden ? "Ir a reuniones" : "Ingresar"}
          </a>
        </div>
      </div>
      <div className={styles["landing"]}>
        <div>
          <h1 className={styles.title}>Comunicate sin barreras</h1>
          <h3>Únete a una plataforma de videollamadas totalmente inclusiva</h3>
          <a onClick={onClickIngresar} className={styles["btn-ingresar"]}>
            {loggeadoAuth && loggeadoIden ? "Ir a reuniones" : "Ingresar"}
          </a>
        </div>
        <div className={styles["hero-container"]}>
          <img
            className={styles["hero"]}
            src={hero}
            alt="Persona en una videollamada"
          />
        </div>
      </div>
      <div className={styles['second-container']}>
        <h3>Acerca de Nosotros</h3>
      </div>
      <div className={styles['third-container']}>
        <div className={styles['img-valores']}>
          <img src={fotoValores} alt='Fotos en un meeting' />
        </div>
        <div className={styles['text-container']}>
          <h3>Nuestra Misión</h3>
          <p className={styles['text-valores']}>  
            Proveer a las instituciones educativas una opción tecnológica viable y
            completa con la que tanto estudiantes, como docentes y funcionarios
            puedan sostener videollamadas fluidas y de calidad sin la barrera
            lingüística que puede llegar a representar el desconocimiento de la
            Lengua de Señas.
          </p>
        </div>
      </div>
      <div className={styles['third-container']}>
      <div className={styles['text-container']}>
          <h3>Nuestra Misión</h3>
          <p className={styles['text-valores']}>  
            Proveer a las instituciones educativas una opción tecnológica viable y
            completa con la que tanto estudiantes, como docentes y funcionarios
            puedan sostener videollamadas fluidas y de calidad sin la barrera
            lingüística que puede llegar a representar el desconocimiento de la
            Lengua de Señas.
          </p>
        </div>
        <div className={styles['img-valores']}>
          <img src={fotoVision} alt='Fotos en un meeting' />
        </div>
      </div>
      <footer className={styles['footer']}>
        <div className={styles['logo-container']}>
          <img src={logoDacti} alt='logo Dactichat'/>
        </div>
        <div className={styles['logo-social-container']}>
          <span className={styles['social-reuniones']}>Nuestras Reuniones</span>
          <AiFillFacebook onClick={() => {window.open('https://www.facebook.com/profile.php?id=100088284396206', '_blank');}} />
          <AiFillInstagram onClick={() => {window.open('https://instagram.com/dactichat?igshid=MTg0ZDhmNDA=', '_blank');}} />
        </div>
      </footer>
    </div>
  );
};

export default Landing;
