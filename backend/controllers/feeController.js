import FeeStructure from '../models/FeeStructure.js';
import Invoice from '../models/Invoice.js';
import Payment from '../models/Payment.js';
import Student from '../models/Student.js';
import { generatePaymentReceiptPdf } from '../utils/pdfGenerator.js';

const generateInvoiceNumber = () => {
  return `INV-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
};

const generatePaymentNumber = () => {
  return `PAY-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
};

// --- FEE STRUCTURES ---

export const createFeeStructure = async (req, res, next) => {
  try {
    const { title, classId, sessionId, amount, dueDate, feeType } = req.body;

    if (!title || !classId || !sessionId || amount === undefined || !dueDate) {
      res.status(400);
      return next(new Error('Please provide title, classId, sessionId, amount, and dueDate'));
    }

    const feeStructure = await FeeStructure.create({
      title,
      classId,
      sessionId,
      amount,
      dueDate,
      feeType: feeType || 'tuition',
    });

    res.status(201).json({
      success: true,
      message: 'Fee structure created successfully',
      data: feeStructure,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeeStructures = async (req, res, next) => {
  try {
    const { classId, sessionId } = req.query;
    const query = {};
    if (classId) query.classId = classId;
    if (sessionId) query.sessionId = sessionId;

    const structures = await FeeStructure.find(query)
      .populate('classId', 'name')
      .populate('sessionId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: structures.length,
      data: structures,
    });
  } catch (error) {
    next(error);
  }
};

// --- INVOICES ---

export const generateInvoices = async (req, res, next) => {
  try {
    const { feeStructureId } = req.body;

    const feeStructure = await FeeStructure.findById(feeStructureId);
    if (!feeStructure) {
      res.status(404);
      return next(new Error('Fee structure not found'));
    }

    // Find all active students in the class
    const students = await Student.find({
      classId: feeStructure.classId,
      status: 'active',
    });

    if (students.length === 0) {
      res.status(400);
      return next(new Error('No active students found in this class'));
    }

    const createdInvoices = [];

    for (const student of students) {
      // Check if invoice already exists
      const existing = await Invoice.findOne({
        studentId: student._id,
        feeStructureId: feeStructure._id,
      });

      if (!existing) {
        const invoice = await Invoice.create({
          invoiceNumber: generateInvoiceNumber(),
          studentId: student._id,
          feeStructureId: feeStructure._id,
          totalAmount: feeStructure.amount,
          paidAmount: 0,
          status: 'unpaid',
          dueDate: feeStructure.dueDate,
        });
        createdInvoices.push(invoice);
      }
    }

    res.status(201).json({
      success: true,
      message: `Generated ${createdInvoices.length} invoices successfully`,
      data: createdInvoices,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentInvoices = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const invoices = await Invoice.find({ studentId })
      .populate('feeStructureId', 'title feeType amount dueDate')
      .populate({
        path: 'studentId',
        select: 'admissionNumber userId',
        populate: { path: 'userId', select: 'name email' },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    next(error);
  }
};

// --- PAYMENTS & PDF RECEIPT ---

export const recordPayment = async (req, res, next) => {
  try {
    const { invoiceId, amountPaid, paymentMethod, transactionId } = req.body;

    if (!invoiceId || !amountPaid) {
      res.status(400);
      return next(new Error('Please provide invoiceId and amountPaid'));
    }

    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      res.status(404);
      return next(new Error('Invoice not found'));
    }

    const payment = await Payment.create({
      paymentNumber: generatePaymentNumber(),
      invoiceId: invoice._id,
      studentId: invoice.studentId,
      amountPaid,
      paymentMethod: paymentMethod || 'cash',
      transactionId: transactionId || '',
      recordedBy: req.user?._id,
    });

    // Update invoice paid amount and status
    invoice.paidAmount += Number(amountPaid);
    if (invoice.paidAmount >= invoice.totalAmount) {
      invoice.status = 'paid';
    } else if (invoice.paidAmount > 0) {
      invoice.status = 'partially_paid';
    }
    await invoice.save();

    res.status(201).json({
      success: true,
      message: 'Payment recorded successfully',
      data: {
        payment,
        invoiceStatus: invoice.status,
        remainingBalance: Math.max(0, invoice.totalAmount - invoice.paidAmount),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentReceiptPdf = async (req, res, next) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      res.status(404);
      return next(new Error('Payment record not found'));
    }

    const invoice = await Invoice.findById(payment.invoiceId).populate('feeStructureId');
    const student = await Student.findById(payment.studentId)
      .populate('userId', 'name email')
      .populate('classId', 'name')
      .populate('sectionId', 'name');

    if (!invoice || !student) {
      res.status(404);
      return next(new Error('Invoice or student metadata missing for receipt'));
    }

    generatePaymentReceiptPdf(payment, invoice, student, res);
  } catch (error) {
    next(error);
  }
};
