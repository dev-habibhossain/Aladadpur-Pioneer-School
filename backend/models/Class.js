import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Class name is required (e.g. Class 10)'],
      trim: true,
      unique: true,
    },
    numericCode: {
      type: Number,
      required: [true, 'Numeric code is required (e.g. 10)'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

const Class = mongoose.model('Class', classSchema);

export default Class;
