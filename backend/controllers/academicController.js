import AcademicSession from '../models/AcademicSession.js';
import Class from '../models/Class.js';
import Section from '../models/Section.js';

// --- ACADEMIC SESSIONS ---

export const createSession = async (req, res, next) => {
  try {
    const { name, startDate, endDate, isCurrent } = req.body;

    if (!name || !startDate || !endDate) {
      res.status(400);
      return next(new Error('Please provide name, startDate, and endDate for the session'));
    }

    if (isCurrent) {
      await AcademicSession.updateMany({}, { isCurrent: false });
    }

    const session = await AcademicSession.create({
      name,
      startDate,
      endDate,
      isCurrent: !!isCurrent,
    });

    res.status(201).json({
      success: true,
      message: 'Academic session created successfully',
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

export const getSessions = async (req, res, next) => {
  try {
    const sessions = await AcademicSession.find().sort({ startDate: -1 });
    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    next(error);
  }
};

export const setCurrentSession = async (req, res, next) => {
  try {
    const { id } = req.params;
    await AcademicSession.updateMany({}, { isCurrent: false });

    const session = await AcademicSession.findByIdAndUpdate(
      id,
      { isCurrent: true },
      { new: true }
    );

    if (!session) {
      res.status(404);
      return next(new Error('Session not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Current academic session updated successfully',
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

// --- CLASSES ---

export const createClass = async (req, res, next) => {
  try {
    const { name, numericCode, description } = req.body;

    if (!name || numericCode === undefined) {
      res.status(400);
      return next(new Error('Please provide class name and numericCode'));
    }

    const newClass = await Class.create({
      name,
      numericCode,
      description: description || '',
    });

    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      data: newClass,
    });
  } catch (error) {
    next(error);
  }
};

export const getClasses = async (req, res, next) => {
  try {
    const classes = await Class.find().sort({ numericCode: 1 });
    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    next(error);
  }
};

// --- SECTIONS ---

export const createSection = async (req, res, next) => {
  try {
    const { name, classId, capacity } = req.body;

    if (!name || !classId) {
      res.status(400);
      return next(new Error('Please provide section name and classId'));
    }

    const section = await Section.create({
      name,
      classId,
      capacity: capacity || 40,
    });

    res.status(201).json({
      success: true,
      message: 'Section created successfully',
      data: section,
    });
  } catch (error) {
    next(error);
  }
};

export const getSections = async (req, res, next) => {
  try {
    const { classId } = req.query;
    const query = classId ? { classId } : {};

    const sections = await Section.find(query).populate('classId', 'name numericCode').sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: sections.length,
      data: sections,
    });
  } catch (error) {
    next(error);
  }
};
