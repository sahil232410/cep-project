import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhq-0fAV80B-ijM4cXbrVBYOp80MqY9dU",
  authDomain: "ecotrack-e0be4.firebaseapp.com",
  projectId: "ecotrack-e0be4",
  storageBucket: "ecotrack-e0be4.firebasestorage.app",
  messagingSenderId: "921738678314",
  appId: "1:921738678314:web:7b56a801706815c1407353",
  measurementId: "G-RZ3V3ETYYQ"
};

// Check if credentials have been configured
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// Initialize Firebase App
const app = isFirebaseConfigured 
  ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
  : null;

// Export Firestore database reference
export const db = app ? getFirestore(app) : null;

export default app;
