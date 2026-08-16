import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

/**
 * @desc    Submit / bulk update daily attendance for a class section
 * @route   POST /api/v1/attendance
 * @access  Private (Teacher / Admin)
 */
export const submitAttendance = async (req, res, next) => {
  try {
    const { classId, sectionId, date, records } = req.body;

    if (!classId || !sectionId || !date || !Array.isArray(records) || records.length === 0) {
      res.status(400);
      return next(new Error('Please provide classId, sectionId, date, and a non-empty records array'));
    }

    // Normalize date to start of day (00:00:00.000)
    const targetDate = new Date(date);
    targetDate.setUTCHours(0, 0, 0, 0);

    const bulkOperations = records.map((record) => ({
      updateOne: {
        filter: {
          studentId: record.studentId,
          date: targetDate,
        },
        update: {
          $set: {
            classId,
            sectionId,
            status: record.status || 'present',
            markedBy: req.user._id,
          },
        },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(bulkOperations);

    res.status(200).json({
      success: true,
      message: `Attendance marked successfully for ${records.length} students`,
      date: targetDate,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get attendance records with filter parameters
 * @route   GET /api/v1/attendance
 * @access  Private
 */
export const getAttendance = async (req, res, next) => {
  try {
    const { classId, sectionId, date, startDate, endDate, studentId } = req.query;

    const query = {};

    if (classId) query.classId = classId;
    if (sectionId) query.sectionId = sectionId;
    if (studentId) query.studentId = studentId;

    if (date) {
      const targetDate = new Date(date);
      targetDate.setUTCHours(0, 0, 0, 0);
      query.date = targetDate;
    } else if (startDate && endDate) {
      const start = new Date(startDate);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }

    const records = await Attendance.find(query)
      .populate({
        path: 'studentId',
        select: 'admissionNumber rollNumber userId',
        populate: { path: 'userId', select: 'name email phone avatar' },
      })
      .populate('classId', 'name')
      .populate('sectionId', 'name')
      .populate('markedBy', 'name role')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get attendance summary metrics for a student (Present %, alerts)
 * @route   GET /api/v1/attendance/student/:studentId/summary
 * @access  Private
 */
export const getStudentAttendanceSummary = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404);
      return next(new Error(`Student not found with ID: ${studentId}`));
    }

    const records = await Attendance.find({ studentId });

    const totalDays = records.length;
    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;
    let excusedCount = 0;

    records.forEach((record) => {
      if (record.status === 'present') presentCount++;
      else if (record.status === 'absent') absentCount++;
      else if (record.status === 'late') lateCount++;
      else if (record.status === 'excused') excusedCount++;
    });

    // Present percentage calculation (counting late as present or partial)
    const effectivePresent = presentCount + lateCount;
    const percentage = totalDays > 0 ? parseFloat(((effectivePresent / totalDays) * 100).toFixed(2)) : 100;

    res.status(200).json({
      success: true,
      data: {
        studentId,
        totalDays,
        presentCount,
        absentCount,
        lateCount,
        excusedCount,
        percentage,
        alertBelowThreshold: percentage < 75,
      },
    });
  } catch (error) {
    next(error);
  }
};
