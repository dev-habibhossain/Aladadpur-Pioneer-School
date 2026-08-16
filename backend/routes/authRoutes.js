import express from 'express';
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  syncFirebaseUser,
  getMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Registration and Login Endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);

// Token Refresh and Session Endpoints
router.post('/refresh-token', refreshToken);
router.post('/logout', logoutUser);

// Firebase Sync Endpoint
router.post('/firebase-sync', syncFirebaseUser);

// Profile Retrieval
router.get('/me', protect, getMe);

export default router;
