import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoKeyForSpikSchoolManagementSystem',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'aladadpur-pioneer-school.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'aladadpur-pioneer-school',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'aladadpur-pioneer-school.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789012:web:abcdef1234567890',
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Auth Service & OAuth Providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default app;
