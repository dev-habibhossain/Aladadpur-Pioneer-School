import express from 'express';
import {
  createSession,
  getSessions,
  setCurrentSession,
  createClass,
  getClasses,
  createSection,
  getSections,
} from '../controllers/academicController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Academic Sessions
router.route('/sessions')
  .post(protect, authorize('admin'), createSession)
  .get(protect, getSessions);

router.patch('/sessions/:id/set-current', protect, authorize('admin'), setCurrentSession);

// Classes
router.route('/classes')
  .post(protect, authorize('admin'), createClass)
  .get(protect, getClasses);

// Sections
router.route('/sections')
  .post(protect, authorize('admin'), createSection)
  .get(protect, getSections);

export default router;
