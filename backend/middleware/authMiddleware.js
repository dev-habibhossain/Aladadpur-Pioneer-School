import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Generate short-lived JWT Access Token (15-min lifespan)
 * @param {string} userId 
 * @param {string} role 
 */
export const generateAccessToken = (userId, role = 'student') => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'spik_sms_super_secret_jwt_access_token_key_2026',
    { expiresIn: '15m' }
  );
};

/**
 * Generate long-lived JWT Refresh Token (7-day lifespan)
 * @param {string} userId 
 * @param {number} version 
 */
export const generateRefreshToken = (userId, version = 0) => {
  return jwt.sign(
    { id: userId, version },
    process.env.REFRESH_TOKEN_SECRET || 'spik_sms_super_secret_jwt_refresh_token_key_2026',
    { expiresIn: '7d' }
  );
};

/**
 * Attach HttpOnly Refresh Token Cookie to response envelope
 * @param {Response} res 
 * @param {string} refreshToken 
 */
export const sendRefreshTokenCookie = (res, refreshToken) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/',
  });
};

/**
 * Clear HttpOnly Refresh Token Cookie
 * @param {Response} res 
 */
export const clearRefreshTokenCookie = (res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/',
  });
};

/**
 * Protect routes middleware — Verifies short-lived Bearer Access Token
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'spik_sms_super_secret_jwt_access_token_key_2026'
      );

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        res.status(401);
        return next(new Error('User account not found'));
      }

      if (req.user.status === 'inactive') {
        res.status(403);
        return next(new Error('User account is deactivated'));
      }

      return next();
    } catch (error) {
      res.status(401);
      return next(new Error('Not authorized, access token expired or invalid'));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, no access token provided in Authorization header'));
  }
};

/**
 * Role-Based Access Control (RBAC) middleware
 * @param  {...string} roles 
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      return next(
        new Error(`Access denied. Role '${req.user?.role || 'guest'}' is not authorized.`)
      );
    }
    next();
  };
};
