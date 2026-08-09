const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validators/authValidator');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/me', protect, authController.getMe);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);

module.exports = router;
