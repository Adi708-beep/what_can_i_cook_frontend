const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, notificationController.getNotifications);
router.patch('/:id/read', protect, notificationController.markAsRead);

module.exports = router;
