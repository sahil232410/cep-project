import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration for EcoTrack (Client-side configuration)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBhq-0fAV80B-ijM4cXbrVBYOp80MqY9dU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ecotrack-e0be4.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ecotrack-e0be4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ecotrack-e0be4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "921738678314",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:921738678314:web:7b56a801706815c1407353",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RZ3V3ETYYQ"
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
