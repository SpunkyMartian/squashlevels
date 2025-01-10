// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBtfMorZhB6qHbKeNoIDqj8y_iGuD22XNY",
    authDomain: "squashlevels-9a756.firebaseapp.com",
    projectId: "squashlevels-9a756",
    storageBucket: "squashlevels-9a756.firebasestorage.app",
    messagingSenderId: "184100820025",
    appId: "1:184100820025:web:4510a978acea5c55f129e8",
    measurementId: "G-52H98D6433"
  };

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);