import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getMessaging, isSupported as isMessagingSupported } from 'firebase/messaging';

// Demo Firebase config (for development/testing)
// Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:demo',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-DEMO',
};

// Check if we're using demo config
const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes('DEMO');

if (isDemoMode) {
  console.warn('⚠️ Running in DEMO mode. Firebase features will be limited.');
  console.warn('To use real Firebase, create a .env.local file with your Firebase configuration.');
}

// Initialize Firebase
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Create a minimal app for demo purposes
  app = getApps().length === 0 ? initializeApp({
    apiKey: 'demo-key',
    authDomain: 'localhost',
    projectId: 'demo',
  }) : getApp();
}

// Auth
export const auth = getAuth(app);

// Firestore
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

// Functions
export const functions = getFunctions(app, 'asia-northeast1');

// Analytics (client-side only)
export const getAnalyticsInstance = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

// Messaging (client-side only)
export const getMessagingInstance = async () => {
  if (typeof window !== 'undefined' && await isMessagingSupported()) {
    return getMessaging(app);
  }
  return null;
};

export default app;