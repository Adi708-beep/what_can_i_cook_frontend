const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

router.get('/profile', protect, userController.getProfile);
router.patch('/profile', protect, userController.updateProfile);
router.post('/onboarding', protect, userController.completeOnboarding);

router.get('/memory', protect, userController.getUserMemory);
router.delete('/memory', protect, userController.resetUserMemory);

module.exports = router;
