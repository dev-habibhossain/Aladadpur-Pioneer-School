import express from 'express';
import { createAssignment, getAssignments } from '../controllers/assignmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin', 'teacher'), createAssignment)
  .get(protect, getAssignments);

export default router;
