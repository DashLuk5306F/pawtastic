import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAAEaYDPMQenpc5FB-56NO8P8TSi_VA9mw",
  authDomain: "pawtastic-f5ab6.firebaseapp.com",
  projectId: "pawtastic-f5ab6",
  storageBucket: "pawtastic-f5ab6.appspot.com",
  messagingSenderId: "751184702169",
  appId: "1:751184702169:web:d285de3f04a2349573acc8",
  measurementId: "G-BHKBYEB8XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

export default app;