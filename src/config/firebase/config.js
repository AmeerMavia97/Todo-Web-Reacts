import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBtaOsHVE71s72BF2fnVgpEipqjikIHmTw",
    authDomain: "todo-react-834ee.firebaseapp.com",
    projectId: "todo-react-834ee",
    storageBucket: "todo-react-834ee.appspot.com",
    messagingSenderId: "622690144122",
    appId: "1:622690144122:web:589ed647fefc68042610c3",
    measurementId: "G-FRXJ91SK4M"
  };



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


