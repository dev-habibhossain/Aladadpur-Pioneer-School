import express from 'express';
import { createNotice, getNotices } from '../controllers/noticeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin', 'teacher'), createNotice)
  .get(protect, getNotices);

export default router;
