// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF4H8Kw8gQziy43k49GSig5p4I6pX9S44",
  authDomain: "dactichat-hackathon.firebaseapp.com",
  projectId: "dactichat-hackathon",
  storageBucket: "dactichat-hackathon.appspot.com",
  messagingSenderId: "528182396472",
  appId: "1:528182396472:web:84ca0b995a71c3426bc8cd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);