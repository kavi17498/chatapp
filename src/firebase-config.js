// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb3QPbN5WQCt2xY45gylIFu1tXxMPsO6U",
  authDomain: "chatapp-d8c94.firebaseapp.com",
  projectId: "chatapp-d8c94",
  storageBucket: "chatapp-d8c94.appspot.com",
  messagingSenderId: "209628065580",
  appId: "1:209628065580:web:fb72290b1b30c63d3ec689"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);