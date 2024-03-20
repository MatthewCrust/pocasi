import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB40x3dLW6bSVsp-PiMXAAPBusoxB1kuE4",
  authDomain: "pocasi-e4c2f.firebaseapp.com",
  projectId: "pocasi-e4c2f",
  storageBucket: "pocasi-e4c2f.appspot.com",
  messagingSenderId: "577044449060",
  appId: "1:577044449060:web:dee83967f7be1a458715b1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth};