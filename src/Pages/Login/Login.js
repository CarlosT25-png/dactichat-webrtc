import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { roomActions } from '../../store/store';
import { app } from '../../firebase-config';
import logo from '../../images/logoDactiNuevo.webp'
import styles from './Login.module.css';
import axios from 'axios';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const authentication = getAuth();

  const onEmail = ev => {
    setEmail(ev.target.value)
  }
  const onPassword = ev => {
    setPassword(ev.target.value)
  }
  const onIngresar = ev => {
    ev.preventDefault();
    toast('Cargando...')
    signInWithEmailAndPassword(authentication, email, password).then((response) => {
      console.log(response);
      axios.get('https://dactichat-hackathon-default-rtdb.firebaseio.com/users.json').then(res => {
        console.log(res);
        for(const key in res.data){
          console.log(res.data[key].uid )
          console.log(response.user.uid)
          if(res.data[key].uid === response.user.uid){
            dispatch(roomActions.setIdentity(res.data[key].nombre))
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
            navigate('/')
          }
        }
      })
      
    }).catch(err => toast.error(err)) ;
  }
  const onRegistrarse = ev => {
    //go to register
    ev.preventDefault();
    navigate('/register')
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles['login-container']}>
        <div className={styles['login-logo-container']}>
          <img className={styles['login-logo']} src={logo} alt='logo dactichat' />
        </div>
        <h3 className={styles['title']}>Iniciar Sesión</h3>
        <div className={styles['input-container']}>
          <label htmlFor="emailInput">Correo Electrónico</label>
          <input value={email} onChange={onEmail} type='email' id="emailInput" placeholder='Correo Eletrónico' />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor="passwordInput">Contraseña</label>
          <input value={password} onChange={onPassword} type='password' id="passwordInput" placeholder='Contraseña' />
        </div>
        <button className={styles['button']} onClick={onIngresar}>Ingresar</button>
        <div className={styles['divider']}></div>
        <button className={styles['button-sec']} onClick={onRegistrarse}>Registrarse</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;