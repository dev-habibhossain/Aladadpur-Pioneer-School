import Assignment from '../models/Assignment.js';

export const createAssignment = async (req, res, next) => {
  try {
    const { title, description, classId, sectionId, subject, dueDate, attachments } = req.body;

    if (!title || !description || !classId || !sectionId || !subject || !dueDate) {
      res.status(400);
      return next(new Error('Please provide title, description, classId, sectionId, subject, and dueDate'));
    }

    const assignment = await Assignment.create({
      title,
      description,
      classId,
      sectionId,
      subject,
      teacherId: req.user._id,
      dueDate,
      attachments: attachments || [],
    });

    res.status(201).json({
      success: true,
      message: 'Assignment published successfully',
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAssignments = async (req, res, next) => {
  try {
    const { classId, sectionId, subject } = req.query;
    const query = {};
    if (classId) query.classId = classId;
    if (sectionId) query.sectionId = sectionId;
    if (subject) query.subject = subject;

    const assignments = await Assignment.find(query)
      .populate('teacherId', 'name email avatar')
      .populate('classId', 'name')
      .populate('sectionId', 'name')
      .sort({ dueDate: 1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments,
    });
  } catch (error) {
    next(error);
  }
};
