import mongoose from 'mongoose';

const academicSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Session name is required (e.g. 2026-2027)'],
      trim: true,
      unique: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const AcademicSession = mongoose.model('AcademicSession', academicSessionSchema);

export default AcademicSession;
