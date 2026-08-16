import express from 'express';
import {
  createFeeStructure,
  getFeeStructures,
  generateInvoices,
  getStudentInvoices,
  recordPayment,
  getPaymentReceiptPdf,
} from '../controllers/feeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Fee Structures
router.route('/structures')
  .post(protect, authorize('admin', 'accountant'), createFeeStructure)
  .get(protect, getFeeStructures);

// Invoices
router.post('/invoices/generate', protect, authorize('admin', 'accountant'), generateInvoices);
router.get('/invoices/student/:studentId', protect, getStudentInvoices);

// Payments & Receipts
router.post('/payments', protect, authorize('admin', 'accountant', 'parent', 'student'), recordPayment);
router.get('/payments/receipt/:paymentId', protect, getPaymentReceiptPdf);

export default router;
