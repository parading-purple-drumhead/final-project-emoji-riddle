// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB41-DMy-o3iOzKqAZj3SPwpUPAJl0BSbA",
  authDomain: "pictoverse-puzzle.firebaseapp.com",
  projectId: "pictoverse-puzzle",
  storageBucket: "pictoverse-puzzle.appspot.com",
  messagingSenderId: "737641848080",
  appId: "1:737641848080:web:e51aa81afc759fce5d9995",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080); // comment out to use live database
export const auth = getAuth(app);
