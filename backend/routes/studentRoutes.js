import express from 'express';
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  updateStudentStatus,
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin'), createStudent)
  .get(protect, authorize('admin', 'teacher', 'accountant'), getStudents);

router.route('/:id')
  .get(protect, getStudentById)
  .patch(protect, authorize('admin'), updateStudent);

router.patch('/:id/status', protect, authorize('admin'), updateStudentStatus);

export default router;
