import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Section name is required (e.g. Section A)'],
      trim: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: [true, 'Class reference is required'],
    },
    capacity: {
      type: Number,
      default: 40,
    },
  },
  { timestamps: true }
);

sectionSchema.index({ name: 1, classId: 1 }, { unique: true });

const Section = mongoose.model('Section', sectionSchema);

export default Section;
