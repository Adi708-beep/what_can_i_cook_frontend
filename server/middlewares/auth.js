const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token = null;

    // Check authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } 
    // Or check cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication token missing or invalid. Please log in.',
        },
      });
    }

    const secret = process.env.JWT_SECRET || 'what_can_i_cook_super_secret_jwt_key_2026_production';
    const decoded = jwt.verify(token, secret);

    // Attach user to request (exclude passwordHash)
    req.user = await User.findById(decoded.id).select('-passwordHash');

    if (!req.user) {
      // Handle fallback dev user if DB is running in mock mode
      req.user = {
        _id: decoded.id || '60d0fe4f5311236168a109ca',
        name: decoded.name || 'Aditya Saha',
        email: decoded.email || 'aditya@example.com',
        role: decoded.role || 'user',
        onboardingCompleted: true,
      };
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Token expired or invalid',
      },
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have permission to perform this action',
        },
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
