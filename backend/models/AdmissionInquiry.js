import mongoose from 'mongoose';

const admissionInquirySchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    targetClass: {
      type: String,
      required: [true, 'Target class is required'],
      trim: true,
    },
    parentName: {
      type: String,
      required: [true, 'Parent name is required'],
      trim: true,
    },
    parentPhone: {
      type: String,
      required: [true, 'Parent phone number is required'],
      trim: true,
    },
    guardianEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const AdmissionInquiry = mongoose.model('AdmissionInquiry', admissionInquirySchema);

export default AdmissionInquiry;
