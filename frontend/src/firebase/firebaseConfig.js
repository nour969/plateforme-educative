import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYCKFc4hcA2H8ObMXA6IK0Oy8SdfB72jc",
  authDomain: "platefome-educative.firebaseapp.com",
  projectId: "platefome-educative",
  storageBucket: "platefome-educative.firebasestorage.app",
  messagingSenderId: "363359763212",
  appId: "1:363359763212:web:a069961a5c6de8a351a729",
  measurementId: "G-CTP192SEC3"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// On exporte les services pour les utiliser ailleurs (comme dans Register.jsx)
export const auth = getAuth(app);
export const db = getFirestore(app);