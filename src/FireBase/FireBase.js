import { initializeApp } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBwkH9ZPTy0MQL0gTEHr16CRA8zq76rxbY",
  authDomain: "wellness-5ae43.firebaseapp.com",
  projectId: "wellness-5ae43",
  storageBucket: "wellness-5ae43.appspot.com",
  messagingSenderId: "75567292340",
  appId: "1:75567292340:web:167a76c12a1cc8191edce1",
  measurementId: "G-05M6Y9RNWH"
};

export const app = initializeApp(firebaseConfig);