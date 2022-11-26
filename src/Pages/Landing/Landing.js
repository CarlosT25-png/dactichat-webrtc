import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Landing.module.css';
import logo from '../../images/logoDactiNuevo.webp';
import hero from '../../images/hero.webp';

const Landing = () => {
  const identity = useSelector(state => state.room.identity);
  let authToken = sessionStorage.getItem('Auth Token');
  const [loggeadoAuth, setLoggeadoAuth] = useState(authToken?.length >= 1 ? true : false);
  const [loggeadoIden, setLoggeadoIdent] = useState(identity?.length >= 1 ? true : false);

  useEffect(() => {
    setLoggeadoAuth(authToken?.length >= 1 ? true : false)
    setLoggeadoIdent(identity?.length >= 1 ? true : false)
  }, [identity, authToken])

  let navigate = useNavigate();
  const onClickIngresar = () => {
    if(identity && authToken){
      navigate('/connect')
    }else{
      navigate('/login')
    }
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles['header']}>
        <img className={styles.logo} src={logo} alt='Logo dactichat' />
        <div>
          <a className={styles['active']}>Inicio</a>
          <a>Nosotros</a>
          <a>Planes</a>
          <a>Reseñas</a>
          <a className={styles['btn-ingresar']} onClick={onClickIngresar}>{loggeadoAuth && loggeadoIden ? 'Ir a reuniones' : 'Ingresar'}</a>
        </div>
      </div>
      <div className={styles['landing']}>
        <div>
          <h1 className={styles.title}>
            Comunicate sin barreras
          </h1>
          <h3>Únete a una plataforma de videollamadas totalmente inclusiva</h3>
          <a onClick={onClickIngresar} className={styles['btn-ingresar']}>{loggeadoAuth && loggeadoIden  ? 'Ir a reuniones' : 'Ingresar'}</a>
        </div>
        <div className={styles['hero-container']}>
          <img className={styles['hero']} src={hero} alt='Persona en una videollamada'/>
        </div>
      </div>
    </div>
  );
}

export default Landing;