import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBIHex_NE7z5TG-xw1E7wAzGlv8f0hzL5Q",
  authDomain: "projetoboard.firebaseapp.com",
  projectId: "projetoboard",
  storageBucket: "projetoboard.appspot.com",
  messagingSenderId: "1030635183776",
  appId: "1:1030635183776:web:c411e05de1feeb774133c5"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)

export {db};