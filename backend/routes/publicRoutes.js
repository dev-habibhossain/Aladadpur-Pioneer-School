import express from 'express';
import {
  getPublicInfo,
  getPublicTeachers,
  getPublicNotices,
  createAdmissionInquiry,
  createContactInquiry,
} from '../controllers/publicController.js';

const router = express.Router();

// Public Routes
router.get('/info', getPublicInfo);
router.get('/teachers', getPublicTeachers);
router.get('/notices', getPublicNotices);
router.post('/admission-inquiry', createAdmissionInquiry);
router.post('/contact-inquiry', createContactInquiry);

export default router;
