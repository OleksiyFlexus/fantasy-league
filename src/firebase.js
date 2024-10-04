import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCFZlGeVph4i1Ljkdw1Lj-va_PBm8XSEeo",
    authDomain: "fantasy-league-54026.firebaseapp.com",
    projectId: "fantasy-league-54026",
    storageBucket: "fantasy-league-54026.appspot.com",
    messagingSenderId: "50003598162",
    appId: "1:50003598162:web:f4c7b17a06f8eceabd788b"
  };

const app = initializeApp(firebaseConfig);

export const firestoreDb = getFirestore(app);
