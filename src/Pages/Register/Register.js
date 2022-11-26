import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { roomActions } from "../../store/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { app } from "../../firebase-config";
import logo from "../../images/logoDactiNuevo.webp";
import styles from "./Register.module.css";
import axios from "axios";

const override = {
  display: "block",
  margin: "0 auto",
  color: 'gray'
};

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const onEmail = (ev) => {
    setEmail(ev.target.value);
  };
  const onPassword = (ev) => {
    setPassword(ev.target.value);
  };
  const onNombre = (ev) => {
    setNombre(ev.target.value);
  };
  const onApellido = (ev) => {
    setApellido(ev.target.value);
  };
  const onIngresar = (ev) => {
    ev.preventDefault();
    navigate("/login");
  };
  const onRegistrarse = async (ev) => {
    //go to register
    ev.preventDefault();
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        console.log(response);
        axios
          .post(
            "https://dactichat-hackathon-default-rtdb.firebaseio.com/users.json",
            {
              nombre: nombre + " " + apellido,
              email,
              uid: response.user.uid,
            }
          )
          .then((resp) => {
            if (resp.status >= 200) {
              sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
              dispatch(roomActions.setIdentity(nombre + " " + apellido));
              setEmail("");
              setApellido("");
              setNombre("");
              setPassword("");
              navigate("/");
            }
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={styles["main-container"]}>
      <form onSubmit={onRegistrarse} className={styles["login-container"]}>
        <div className={styles["login-logo-container"]}>
          <img
            className={styles["login-logo"]}
            src={logo}
            alt="logo dactichat"
          />
        </div>
        <h3 className={styles["title"]}>Registrarse</h3>
        <div className={styles["input-container"]}>
          <label htmlFor="nombreInput">Nombre</label>
          <input
            value={nombre}
            onChange={onNombre}
            required
            type="text"
            id="nombreInput"
            placeholder="Nombre"
          />
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor="apellidoInput">Apellido</label>
          <input
            value={apellido}
            onChange={onApellido}
            type="text"
            required
            id="apellidoInput"
            placeholder="Apellido"
          />
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor="emailInput">Correo Electrónico</label>
          <input
            value={email}
            onChange={onEmail}
            type="email"
            required
            id="emailInput"
            placeholder="Correo Eletrónico"
          />
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor="passwordInput">Contraseña</label>
          <input
            value={password}
            onChange={onPassword}
            type="password"
            required
            minLength={8}
            id="passwordInput"
            placeholder="Contraseña"
          />
        </div>
        <button className={styles["button"]} onClick={onRegistrarse}>
          Registrarse
        </button>
        <div className={styles["divider"]}></div>
        <button className={styles["button-sec"]} onClick={onIngresar}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Register;
