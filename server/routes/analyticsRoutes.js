const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, analyticsController.getAnalytics);

module.exports = router;
