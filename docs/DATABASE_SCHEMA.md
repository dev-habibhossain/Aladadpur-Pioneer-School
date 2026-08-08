# DATABASE_SCHEMA.md
## Database Schema Specification — MongoDB / Mongoose

| | |
|---|---|
| **Database Engine** | MongoDB Atlas |
| **ODM Framework** | Mongoose v8.0+ |
| **Soft Delete Rule** | `status` enum field default `"active"`, no physical deletion |

---

## 1. Mongoose Model Schemas

### 1.1 `User` Model (`models/User.model.js`)
```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false, minlength: 8 },
    role: {
      type: String,
      enum: ["admin", "teacher", "student", "parent", "accountant"],
      required: true,
    },
    phone: { type: String, trim: true },
    avatar: {
      url: { type: String },
      publicId: { type: String },
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    refreshTokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.index({ role: 1, status: 1 });

export default mongoose.model("User", userSchema);
```

### 1.2 `Student` Model (`models/Student.model.js`)
```javascript
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    admissionNumber: { type: String, required: true, unique: true }, // e.g. PRE43178
    admissionDate: { type: Date, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicSession", required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    rollNumber: { type: Number, required: true },
    guardianIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parent" }],
    status: { 
      type: String, 
      enum: ["active", "inactive", "graduated", "transferred"], 
      default: "active" 
    },
  },
  { timestamps: true }
);

studentSchema.index({ classId: 1, sectionId: 1, sessionId: 1 });
studentSchema.index({ admissionNumber: 1 }, { unique: true });

export default mongoose.model("Student", studentSchema);
```

### 1.3 `Attendance` Model (`models/Attendance.model.js`)
```javascript
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["present", "absent", "late", "excused"], required: true },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  },
  { timestamps: true }
);

attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });
attendanceSchema.index({ classId: 1, sectionId: 1, date: 1 });

export default mongoose.model("Attendance", attendanceSchema);
```
