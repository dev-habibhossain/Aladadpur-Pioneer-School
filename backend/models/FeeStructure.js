import mongoose from 'mongoose';

const feeStructureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Fee structure title is required (e.g. Monthly Tuition Fee)'],
      trim: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: [true, 'Class ID is required'],
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicSession',
      required: [true, 'Academic session ID is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Fee amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    feeType: {
      type: String,
      enum: ['tuition', 'exam', 'admission', 'transport', 'other'],
      default: 'tuition',
    },
  },
  { timestamps: true }
);

const FeeStructure = mongoose.model('FeeStructure', feeStructureSchema);

export default FeeStructure;
