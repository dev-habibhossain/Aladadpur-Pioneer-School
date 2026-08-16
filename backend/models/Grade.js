import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: [true, 'Exam ID is required'],
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student ID is required'],
    },
    subject: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
    },
    marksObtained: {
      type: Number,
      required: [true, 'Marks obtained is required'],
      min: 0,
    },
    totalMarks: {
      type: Number,
      default: 100,
      min: 1,
    },
    gradeLetter: {
      type: String,
      default: 'A',
    },
    remarks: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

gradeSchema.index({ examId: 1, studentId: 1, subject: 1 }, { unique: true });

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;
