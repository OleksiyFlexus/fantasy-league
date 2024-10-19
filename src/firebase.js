import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFZlGeVph4i1Ljkdw1Lj-va_PBm8XSEeo",
  authDomain: "fantasy-league-54026.firebaseapp.com",
  databaseURL: "https://fantasy-league-54026-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "fantasy-league-54026",
  storageBucket: "fantasy-league-54026.appspot.com",
  messagingSenderId: "50003598162",
  appId: "1:50003598162:web:f4c7b17a06f8eceabd788b"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);
