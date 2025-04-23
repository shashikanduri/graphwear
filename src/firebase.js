// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDgHlTPj49gm-TFuh0SrzIUhmq-pYw-ifw",
    authDomain: "graphware-1761f.firebaseapp.com",
    projectId: "graphware-1761f",
    storageBucket: "graphware-1761f.firebasestorage.app",
    messagingSenderId: "975460401347",
    appId: "1:975460401347:web:f863efc8eb9a5b066c2276",
    measurementId: "G-ZRCBDTJ827"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);