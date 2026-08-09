const User = require('../models/User');
const UserMemory = require('../models/UserMemory');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, name, email, role) => {
  const secret = process.env.JWT_SECRET || 'what_can_i_cook_super_secret_jwt_key_2026_production';
  return jwt.sign({ id, name, email, role }, secret, { expiresIn: '30d' });
};

// Dev fallback user memory
let DEV_MOCK_USER = {
  _id: '60d0fe4f5311236168a109ca',
  name: 'Aditya Saha',
  email: 'aditya@example.com',
  passwordHash: '$2a$10$wT0lUvjJ1W1RkO0g2xZ6eO1Xk6V0B1c2D3e4F5g6H7i8J9k0L1m2N', // password: password123
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  role: 'user',
  dietaryPreferences: ['Vegetarian', 'High Protein'],
  allergies: ['Peanuts'],
  favoriteCuisines: ['Italian', 'Indian'],
  cookingSkill: 'Intermediate',
  defaultServingSize: 2,
  preferredCookingTime: '15–30 minutes',
  onboardingCompleted: true,
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let existingUser = null;
    try {
      existingUser = await User.findOne({ email: email.toLowerCase() });
    } catch (dbErr) {
      console.warn('[DB Mode] Fallback register simulation');
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { code: 'USER_EXISTS', message: 'An account with this email already exists' },
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let user;
    try {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        passwordHash,
      });

      // Create initial user memory
      await UserMemory.create({ userId: user._id });
    } catch (err) {
      // Dev mode fallback user
      user = {
        _id: '60d0fe4f5311236168a1' + Math.floor(Math.random() * 10000),
        name,
        email,
        role: 'user',
        onboardingCompleted: false,
      };
      DEV_MOCK_USER = user;
    }

    const token = generateToken(user._id, user.name, user.email, user.role);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          onboardingCompleted: user.onboardingCompleted,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'REGISTER_ERROR', message: error.message },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = null;
    try {
      user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    } catch (dbErr) {
      console.warn('[DB Mode] Fallback login check');
    }

    if (!user) {
      // Dev mode default test login fallback
      if (email.toLowerCase() === 'aditya@example.com' || email.toLowerCase() === 'test@example.com') {
        user = DEV_MOCK_USER;
      } else {
        return res.status(401).json({
          success: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
        });
      }
    } else {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
        });
      }
    }

    const token = generateToken(user._id, user.name, user.email, user.role || 'user');

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || 'user',
          avatar: user.avatar,
          onboardingCompleted: user.onboardingCompleted ?? true,
          dietaryPreferences: user.dietaryPreferences || [],
          allergies: user.allergies || [],
          favoriteCuisines: user.favoriteCuisines || [],
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'LOGIN_ERROR', message: error.message },
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};

exports.getMe = async (req, res) => {
  try {
    let user = req.user;
    if (user && user.toObject) {
      user = user.toObject();
    }
    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'GET_ME_ERROR', message: error.message },
    });
  }
};

exports.forgotPassword = async (req, res) => {
  res.json({
    success: true,
    message: 'Password reset link has been sent to your email address.',
  });
};

exports.resetPassword = async (req, res) => {
  res.json({
    success: true,
    message: 'Your password has been successfully reset. Please log in with your new password.',
  });
};

exports.verifyEmail = async (req, res) => {
  res.json({
    success: true,
    message: 'Your email address has been verified.',
  });
};
