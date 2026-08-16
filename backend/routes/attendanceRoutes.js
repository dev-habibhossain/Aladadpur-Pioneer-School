import express from 'express';
import {
  submitAttendance,
  getAttendance,
  getStudentAttendanceSummary,
} from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin', 'teacher'), submitAttendance)
  .get(protect, getAttendance);

router.get('/student/:studentId/summary', protect, getStudentAttendanceSummary);

export default router;
