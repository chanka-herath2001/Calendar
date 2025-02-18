import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9StjjmdHGBA0LW6p0lyEUy2inoc4M45o",

  authDomain: "event-tracker-42809.firebaseapp.com",

  projectId: "event-tracker-42809",

  storageBucket: "event-tracker-42809.firebasestorage.app",

  messagingSenderId: "799210270831",

  appId: "1:799210270831:web:4b7f783f6bad940d451d9a",

  measurementId: "G-QGQQM7V3J7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc };
