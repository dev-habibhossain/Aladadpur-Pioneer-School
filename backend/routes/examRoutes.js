import express from 'express';
import {
  createExam,
  getExams,
  submitGrades,
  getStudentResults,
} from '../controllers/examController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin', 'teacher'), createExam)
  .get(protect, getExams);

router.post('/grades', protect, authorize('admin', 'teacher'), submitGrades);
router.get('/results/student/:studentId', protect, getStudentResults);

export default router;
