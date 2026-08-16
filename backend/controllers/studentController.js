import Student from '../models/Student.js';
import User from '../models/User.js';

/**
 * Helper to generate unique admission number e.g. PRE43178
 */
const generateAdmissionNumber = () => {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `PRE${randomDigits}`;
};

/**
 * @desc    Enroll a new student & create linked user profile
 * @route   POST /api/v1/students
 * @access  Private (Admin)
 */
export const createStudent = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
      sessionId,
      classId,
      sectionId,
      rollNumber,
      guardianIds,
      admissionNumber,
    } = req.body;

    if (!name || !email || !dateOfBirth || !gender) {
      res.status(400);
      return next(new Error('Please provide name, email, dateOfBirth, and gender'));
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400);
      return next(new Error('A user with this email already exists'));
    }

    // Create user profile for student
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: password || 'Student@123',
      role: 'student',
      phone: phone || '',
      status: 'active',
    });

    const admNum = admissionNumber || generateAdmissionNumber();

    const student = await Student.create({
      userId: user._id,
      admissionNumber: admNum,
      dateOfBirth,
      gender,
      sessionId: sessionId || null,
      classId: classId || null,
      sectionId: sectionId || null,
      rollNumber: rollNumber || 1,
      guardianIds: guardianIds || [],
      status: 'active',
    });

    const populatedStudent = await Student.findById(student._id)
      .populate('userId', 'name email phone avatar status')
      .populate('classId', 'name numericCode')
      .populate('sectionId', 'name')
      .populate('sessionId', 'name');

    res.status(201).json({
      success: true,
      message: 'Student enrolled successfully',
      data: populatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get student directory with filters & pagination
 * @route   GET /api/v1/students
 * @access  Private (Admin / Teacher / Accountant)
 */
export const getStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const { classId, sectionId, sessionId, status, search } = req.query;

    const query = {};

    if (classId) query.classId = classId;
    if (sectionId) query.sectionId = sectionId;
    if (sessionId) query.sessionId = sessionId;
    if (status) query.status = status;

    if (search) {
      // Find matching user IDs by name/email
      const matchingUsers = await User.find({
        role: 'student',
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
        ],
      }).select('_id');

      const userIds = matchingUsers.map((u) => u._id);

      query.$or = [
        { admissionNumber: { $regex: search, $options: 'i' } },
        { userId: { $in: userIds } },
      ];
    }

    const totalRecords = await Student.countDocuments(query);
    const students = await Student.find(query)
      .populate('userId', 'name email phone avatar status')
      .populate('classId', 'name numericCode')
      .populate('sectionId', 'name')
      .populate('sessionId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: students.length,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalRecords / limit) || 1,
        totalRecords,
      },
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single student details by ID
 * @route   GET /api/v1/students/:id
 * @access  Private
 */
export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId', 'name email phone avatar status')
      .populate('classId', 'name numericCode')
      .populate('sectionId', 'name')
      .populate('sessionId', 'name')
      .populate('guardianIds', 'name email phone');

    if (!student) {
      res.status(404);
      return next(new Error(`Student not found with ID: ${req.params.id}`));
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update student profile details
 * @route   PATCH /api/v1/students/:id
 * @access  Private (Admin)
 */
export const updateStudent = async (req, res, next) => {
  try {
    const { name, phone, classId, sectionId, sessionId, rollNumber, guardianIds, status } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404);
      return next(new Error(`Student not found with ID: ${req.params.id}`));
    }

    // Update linked user details if name or phone changed
    if (name || phone) {
      const user = await User.findById(student.userId);
      if (user) {
        if (name) user.name = name;
        if (phone !== undefined) user.phone = phone;
        await user.save();
      }
    }

    if (classId) student.classId = classId;
    if (sectionId) student.sectionId = sectionId;
    if (sessionId) student.sessionId = sessionId;
    if (rollNumber !== undefined) student.rollNumber = rollNumber;
    if (guardianIds) student.guardianIds = guardianIds;
    if (status) student.status = status;

    await student.save();

    const updatedStudent = await Student.findById(student._id)
      .populate('userId', 'name email phone avatar status')
      .populate('classId', 'name numericCode')
      .populate('sectionId', 'name')
      .populate('sessionId', 'name');

    res.status(200).json({
      success: true,
      message: 'Student record updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update student status (soft-delete / graduated / transferred)
 * @route   PATCH /api/v1/students/:id/status
 * @access  Private (Admin)
 */
export const updateStudentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['active', 'inactive', 'graduated', 'transferred'].includes(status)) {
      res.status(400);
      return next(new Error('Invalid status option'));
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404);
      return next(new Error(`Student not found with ID: ${req.params.id}`));
    }

    student.status = status;
    await student.save();

    // Also sync user status
    if (status === 'inactive') {
      await User.findByIdAndUpdate(student.userId, { status: 'inactive' });
    } else if (status === 'active') {
      await User.findByIdAndUpdate(student.userId, { status: 'active' });
    }

    res.status(200).json({
      success: true,
      message: `Student status updated to '${status}' successfully`,
      data: { _id: student._id, status: student.status },
    });
  } catch (error) {
    next(error);
  }
};
