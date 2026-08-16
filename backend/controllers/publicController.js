import User from '../models/User.js';
import Notice from '../models/Notice.js';
import AdmissionInquiry from '../models/AdmissionInquiry.js';
import ContactInquiry from '../models/ContactInquiry.js';

/**
 * @desc    Get public institution overview, contact details, & live stats
 * @route   GET /api/v1/public/info
 * @access  Public
 */
export const getPublicInfo = async (req, res, next) => {
  try {
    const studentCount = await User.countDocuments({ role: 'student', status: 'active' });
    const teacherCount = await User.countDocuments({ role: 'teacher', status: 'active' });
    const parentCount = await User.countDocuments({ role: 'parent', status: 'active' });

    res.status(200).json({
      success: true,
      message: 'Public institution info fetched successfully',
      data: {
        schoolName: 'Aladadpur Pioneer High School & Academy',
        eiin: '134250',
        schoolCode: '4021',
        established: 2010,
        tagline: 'Nurturing Minds, Building Character & Future Leaders',
        contact: {
          address: 'Village: Aladadpur, Post: Pioneer, Upazila/District, Bangladesh',
          email: 'info@aladadpurpioneer.edu.bd',
          admissionEmail: 'admission@aladadpurpioneer.edu.bd',
          phone: '+880 1700-000000',
          admissionHotline: '+880 1800-000000',
          officeHours: 'Sun - Thu: 8:00 AM - 3:30 PM',
        },
        stats: {
          activeLearners: studentCount > 0 ? studentCount : 1500,
          expertEducators: teacherCount > 0 ? teacherCount : 45,
          satisfiedParents: parentCount > 0 ? parentCount : 560,
          sscPassRate: '100%',
        },
        session: '2026-2027',
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get public list of teachers / faculty
 * @route   GET /api/v1/public/teachers
 * @access  Public
 */
export const getPublicTeachers = async (req, res, next) => {
  try {
    let teachers = await User.find({ role: 'teacher' }).select(
      'name email phone designation department qualifications experience avatar status'
    );

    // Auto-seed default teachers into DB if empty
    if (!teachers || teachers.length === 0) {
      const defaultTeachers = [
        {
          name: 'Md. Rafiqul Islam',
          email: 'headmaster@aladadpurpioneer.edu.bd',
          role: 'teacher',
          designation: 'Headmaster & Principal',
          department: 'Administration',
          qualifications: 'M.Sc in Physics, M.Ed (DU)',
          experience: '18 Years Experience',
          avatar: { url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
        },
        {
          name: 'Nusrat Jahan',
          email: 'nusrat.jahan@aladadpurpioneer.edu.bd',
          role: 'teacher',
          designation: 'Assistant Headmaster (Academic)',
          department: 'English',
          qualifications: 'M.A in English Literature (CU), B.Ed',
          experience: '14 Years Experience',
          avatar: { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
        },
        {
          name: 'Engr. Tanvir Ahmed',
          email: 'tanvir.ict@aladadpurpioneer.edu.bd',
          role: 'teacher',
          designation: 'Senior ICT & Computer Teacher',
          department: 'ICT & Science',
          qualifications: 'B.Sc in Computer Science (SUST)',
          experience: '8 Years Experience',
          avatar: { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
        },
        {
          name: 'Dr. Shahinur Rahman',
          email: 'shahinur.chem@aladadpurpioneer.edu.bd',
          role: 'teacher',
          designation: 'Senior Science Faculty (Chemistry)',
          department: 'ICT & Science',
          qualifications: 'M.Sc in Applied Chemistry (RU)',
          experience: '11 Years Experience',
          avatar: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
        },
        {
          name: 'Fatema Khatun',
          email: 'fatema.math@aladadpurpioneer.edu.bd',
          role: 'teacher',
          designation: 'Senior Mathematics Teacher',
          department: 'Mathematics',
          qualifications: 'M.Sc in Mathematics (DU)',
          experience: '10 Years Experience',
          avatar: { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
        },
        {
          name: 'Anisur Rahman',
          email: 'anisur.history@aladadpurpioneer.edu.bd',
          role: 'teacher',
          designation: 'Senior Social Studies & History Faculty',
          department: 'Humanities',
          qualifications: 'M.A in International Relations (DU)',
          experience: '12 Years Experience',
          avatar: { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
        },
      ];

      teachers = await User.insertMany(defaultTeachers);
    }

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get public notices from MongoDB
 * @route   GET /api/v1/public/notices
 * @access  Public
 */
export const getPublicNotices = async (req, res, next) => {
  try {
    let notices = await Notice.find({
      $or: [{ targetRoles: 'all' }, { targetRoles: 'student' }, { targetRoles: 'parent' }],
    }).sort({ createdAt: -1 });

    // Auto-seed sample notices if empty
    if (!notices || notices.length === 0) {
      // Find or create admin user ID for publishedBy
      let admin = await User.findOne({ role: 'admin' });
      if (!admin) {
        admin = await User.create({
          name: 'Principal Office',
          email: 'admin.office@aladadpurpioneer.edu.bd',
          role: 'admin',
          status: 'active',
        });
      }

      const defaultNotices = [
        {
          title: 'Annual Sports Competition & Cultural Function 2026 Notice',
          content: 'All students from Class 1 to Class 10 are requested to register their names with the class teachers for sports events by 20th Feb.',
          targetRoles: ['all'],
          publishedBy: admin._id,
          isImportant: true,
        },
        {
          title: 'First Term Examination Routine & Syllabus Published for Session 2026',
          content: 'The First Term Examination for Class Play to Class 10 will commence from March 10, 2026. Download the routine below.',
          targetRoles: ['all'],
          publishedBy: admin._id,
          isImportant: true,
        },
        {
          title: 'International Mother Language Day Holiday Announcement (21st February)',
          content: 'The school will remain closed on Saturday, 21st February on the occasion of Shaheed Dibash & International Mother Language Day.',
          targetRoles: ['all'],
          publishedBy: admin._id,
          isImportant: false,
        },
        {
          title: 'Monthly Tuition Fee Payment Reminder for February 2026',
          content: 'Parents are requested to clear monthly tuition fees through the Parent Portal before the 15th of February to avoid late charges.',
          targetRoles: ['all'],
          publishedBy: admin._id,
          isImportant: false,
        },
        {
          title: 'Special Extra Classes for Class 10 Board Examinees (SSC Batch 2026)',
          content: 'Extra guidance classes for Mathematics and Physics will take place every Friday from 9:00 AM to 11:30 AM in Room 302.',
          targetRoles: ['all'],
          publishedBy: admin._id,
          isImportant: false,
        },
      ];

      notices = await Notice.insertMany(defaultNotices);
    }

    res.status(200).json({
      success: true,
      count: notices.length,
      data: notices,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit online admission inquiry to MongoDB
 * @route   POST /api/v1/public/admission-inquiry
 * @access  Public
 */
export const createAdmissionInquiry = async (req, res, next) => {
  try {
    const { studentName, targetClass, parentName, parentPhone, guardianEmail, address } = req.body;

    if (!studentName || !targetClass || !parentName || !parentPhone) {
      res.status(400);
      return next(new Error('Please fill in all required admission inquiry fields'));
    }

    const inquiry = await AdmissionInquiry.create({
      studentName,
      targetClass,
      parentName,
      parentPhone,
      guardianEmail,
      address,
    });

    res.status(201).json({
      success: true,
      message: 'Admission inquiry submitted successfully! Our admission desk will contact you soon.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit public contact inquiry to MongoDB
 * @route   POST /api/v1/public/contact-inquiry
 * @access  Public
 */
export const createContactInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      return next(new Error('Please provide name, email, and message body'));
    }

    const contactMsg = await ContactInquiry.create({
      name,
      email,
      phone,
      subject: subject || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully to Aladadpur Pioneer School administration',
      data: contactMsg,
    });
  } catch (error) {
    next(error);
  }
};
