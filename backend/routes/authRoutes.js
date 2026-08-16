import express from 'express';
import { syncFirebaseUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Synchronize Firebase user after login / signup
router.post('/firebase-sync', syncFirebaseUser);

// Get current user profile
router.get('/me', protect, getMe);

export default router;
