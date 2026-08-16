import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshTokenCookie,
  clearRefreshTokenCookie,
} from '../middleware/authMiddleware.js';

/**
 * Helper to handle issuing dual tokens and returning user response
 */
const issueTokensAndRespond = (res, user, statusCode = 200, message = 'Authenticated successfully') => {
  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id, user.refreshTokenVersion || 0);

  sendRefreshTokenCookie(res, refreshToken);

  res.status(statusCode).json({
    success: true,
    message,
    token: accessToken,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      firebaseUid: user.firebaseUid,
    },
  });
};

/**
 * @desc    Register a new user account
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      return next(new Error('Please provide name, email, and password'));
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400);
      return next(new Error('User already exists with this email address'));
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'student',
      phone: phone || '',
    });

    issueTokensAndRespond(res, user, 201, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user login & issue tokens
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      return next(new Error('Please provide both email and password'));
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      return next(new Error('Invalid email or password'));
    }

    if (user.status === 'inactive') {
      res.status(403);
      return next(new Error('Account is deactivated. Please contact administration.'));
    }

    issueTokensAndRespond(res, user, 200, 'Logged in successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Refresh access token using HttpOnly refresh cookie
 * @route   POST /api/v1/auth/refresh-token
 * @access  Public (Requires HttpOnly refreshToken cookie)
 */
export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      res.status(401);
      return next(new Error('No refresh token provided in HttpOnly cookie'));
    }

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET || 'spik_sms_super_secret_jwt_refresh_token_key_2026'
      );
    } catch (err) {
      clearRefreshTokenCookie(res);
      res.status(401);
      return next(new Error('Invalid or expired refresh token. Please login again.'));
    }

    const user = await User.findById(decoded.id);

    if (!user || user.status === 'inactive') {
      clearRefreshTokenCookie(res);
      res.status(401);
      return next(new Error('User account not found or deactivated'));
    }

    // Verify token version matches active session version
    if (user.refreshTokenVersion !== decoded.version) {
      clearRefreshTokenCookie(res);
      res.status(401);
      return next(new Error('Refresh token session has been revoked'));
    }

    // Generate new access token and rotated refresh token
    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id, user.refreshTokenVersion || 0);

    sendRefreshTokenCookie(res, newRefreshToken);

    res.status(200).json({
      success: true,
      message: 'Access token refreshed successfully',
      token: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user & clear refresh token cookie
 * @route   POST /api/v1/auth/logout
 * @access  Public / Protected
 */
export const logoutUser = async (req, res, next) => {
  try {
    // Invalidate refresh token session if authenticated
    if (req.user?._id) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { refreshTokenVersion: 1 },
      });
    }

    clearRefreshTokenCookie(res);

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};

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

    let user = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { firebaseUid: uid }],
    });

    if (user) {
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

    issueTokensAndRespond(res, user, 200, 'User synchronized successfully');
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
      return next(new Error('User profile not found'));
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
