/**
 * @desc    Get public institution overview & status
 * @route   GET /api/v1/public/info
 * @access  Public
 */
export const getPublicInfo = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Public institution info fetched successfully',
      data: {
        schoolName: 'Aladadpur Pioneer School',
        tagline: 'Excellence in Education and Character',
        established: 2010,
        contact: {
          email: 'info@aladadpurpioneer.edu.bd',
          phone: '+880 1700-000000',
          address: 'Aladadpur, Bangladesh',
        },
        supportedRoles: ['admin', 'teacher', 'student', 'parent', 'accountant'],
        version: '1.0.0',
      },
    });
  } catch (error) {
    next(error);
  }
};
