import User from '../models/User.js';
import { generateAccessToken } from '../middleware/authMiddleware.js';

/**
 * @desc    Synchronize user profile after Firebase Auth login / signup
 * @route   POST /api/v1/auth/firebase-sync
 * @access  Public
 */
export const syncFirebaseUser = async (req, res, next) => {
  try {
    const { uid, email, displayName, photoURL, role, phone } = req.body;

    if (!email) {
      res.status(400);
      return next(new Error('Email is required for user synchronization'));
    }

    // Check if user exists by email or firebaseUid
    let user = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { firebaseUid: uid }],
    });

    if (user) {
      // Update existing user details if changed
      let updated = false;
      if (uid && !user.firebaseUid) {
        user.firebaseUid = uid;
        updated = true;
      }
      if (displayName && user.name !== displayName) {
        user.name = displayName;
        updated = true;
      }
      if (photoURL && user.avatar?.url !== photoURL) {
        user.avatar = { url: photoURL, publicId: '' };
        updated = true;
      }

      if (updated) {
        await user.save();
      }
    } else {
      // Create new MongoDB user record
      user = await User.create({
        name: displayName || email.split('@')[0],
        email: email.toLowerCase(),
        firebaseUid: uid || '',
        role: role || 'student',
        phone: phone || '',
        avatar: { url: photoURL || '', publicId: '' },
        status: 'active',
      });
    }

    const token = generateAccessToken(user._id);

    res.status(200).json({
      success: true,
      message: 'User synchronized successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        status: user.status,
        firebaseUid: user.firebaseUid,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get currently logged in user profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
