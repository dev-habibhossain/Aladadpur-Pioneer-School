import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Generate JWT Access Token helper
 * @param {string} userId 
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'spik_sms_secret', {
    expiresIn: '7d',
  });
};

/**
 * Protect routes - Verifies JWT Bearer token
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'spik_sms_secret');

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
      return next(new Error('Not authorized, token verification failed'));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, no token provided'));
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
