// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Uvih9bkMlCDfa5GIK6ERYucQ92Pfe3A",
  authDomain: "schedulesync-4964e.firebaseapp.com",
  projectId: "schedulesync-4964e",
  storageBucket: "schedulesync-4964e.firebasestorage.app",
  messagingSenderId: "194929866583",
  appId: "1:194929866583:web:38a94ee8cd12a31d977012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)