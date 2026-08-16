import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import axios from 'axios';
import { auth, googleProvider } from '../firebase/firebase.init';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

/**
 * Log in user using Firebase and backend sync
 */
export const loginWithEmailPassword = async (email, password) => {
  try {
    // 1. Firebase Authentication
    const firebaseUser = await signInWithEmailAndPassword(auth, email, password);

    // 2. Backend API Authentication (attempt sync)
    let backendData = null;
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      if (res.data?.success) {
        backendData = res.data;
        if (res.data.token) {
          localStorage.setItem('spik_token', res.data.token);
          localStorage.setItem('spik_user', JSON.stringify(res.data.data));
        }
      }
    } catch (err) {
      console.warn('Backend login sync skipped or unavailable:', err.message);
    }

    return {
      user: firebaseUser.user,
      backendUser: backendData?.data || null,
      token: backendData?.token || null,
      error: null,
    };
  } catch (error) {
    return { user: null, backendUser: null, token: null, error: error.message };
  }
};

/**
 * Sign up a new user using Firebase and backend registration
 */
export const signupWithEmailPassword = async ({ name, email, password, role = 'student', phone = '' }) => {
  try {
    // 1. Firebase User Creation
    const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);

    // Update Firebase Profile display name
    if (name) {
      await updateProfile(firebaseUser.user, { displayName: name });
    }

    // 2. Backend Registration API Sync
    let backendData = null;
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, {
        name,
        email,
        password,
        role,
        phone,
      });

      if (res.data?.success) {
        backendData = res.data;
        if (res.data.token) {
          localStorage.setItem('spik_token', res.data.token);
          localStorage.setItem('spik_user', JSON.stringify(res.data.data));
        }
      }
    } catch (err) {
      console.warn('Backend register sync skipped or unavailable:', err.message);
    }

    return {
      user: firebaseUser.user,
      backendUser: backendData?.data || null,
      token: backendData?.token || null,
      error: null,
    };
  } catch (error) {
    return { user: null, backendUser: null, token: null, error: error.message };
  }
};

/**
 * Log in user using Google Auth Popup
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

/**
 * Log out user from Firebase and clear local storage
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('spik_token');
    localStorage.removeItem('spik_user');
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Listen to real-time auth state changes
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};
