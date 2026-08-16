import Exam from '../models/Exam.js';
import Grade from '../models/Grade.js';

const calculateGradeLetter = (marks, total = 100) => {
  const percentage = (marks / total) * 100;
  if (percentage >= 80) return 'A+';
  if (percentage >= 70) return 'A';
  if (percentage >= 60) return 'A-';
  if (percentage >= 50) return 'B';
  if (percentage >= 40) return 'C';
  if (percentage >= 33) return 'D';
  return 'F';
};

export const createExam = async (req, res, next) => {
  try {
    const { name, classId, sessionId, startDate, endDate } = req.body;

    if (!name || !classId || !sessionId || !startDate || !endDate) {
      res.status(400);
      return next(new Error('Please provide name, classId, sessionId, startDate, and endDate'));
    }

    const exam = await Exam.create({
      name,
      classId,
      sessionId,
      startDate,
      endDate,
    });

    res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      data: exam,
    });
  } catch (error) {
    next(error);
  }
};

export const getExams = async (req, res, next) => {
  try {
    const { classId, sessionId } = req.query;
    const query = {};
    if (classId) query.classId = classId;
    if (sessionId) query.sessionId = sessionId;

    const exams = await Exam.find(query)
      .populate('classId', 'name')
      .populate('sessionId', 'name')
      .sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

export const submitGrades = async (req, res, next) => {
  try {
    const { examId, studentId, grades } = req.body;

    if (!examId || !studentId || !Array.isArray(grades) || grades.length === 0) {
      res.status(400);
      return next(new Error('Please provide examId, studentId, and grades array'));
    }

    const bulkOperations = grades.map((item) => {
      const totalMarks = item.totalMarks || 100;
      const gradeLetter = item.gradeLetter || calculateGradeLetter(item.marksObtained, totalMarks);

      return {
        updateOne: {
          filter: { examId, studentId, subject: item.subject },
          update: {
            $set: {
              marksObtained: item.marksObtained,
              totalMarks,
              gradeLetter,
              remarks: item.remarks || '',
            },
          },
          upsert: true,
        },
      };
    });

    await Grade.bulkWrite(bulkOperations);

    res.status(200).json({
      success: true,
      message: `Grades submitted successfully for ${grades.length} subjects`,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentResults = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { examId } = req.query;

    const query = { studentId };
    if (examId) query.examId = examId;

    const grades = await Grade.find(query)
      .populate('examId', 'name startDate endDate')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: grades.length,
      data: grades,
    });
  } catch (error) {
    next(error);
  }
};
