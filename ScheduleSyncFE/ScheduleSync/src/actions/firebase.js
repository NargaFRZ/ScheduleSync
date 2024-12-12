// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCi7qW0KKAtZSB7B2R78R_UTYZXTcoMQkI",
  authDomain: "sip16-25755.firebaseapp.com",
  projectId: "sip16-25755",
  storageBucket: "sip16-25755.appspot.com",
  messagingSenderId: "49573219885",
  appId: "1:49573219885:web:4644334f8645e22dbff2a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)