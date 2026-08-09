const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/mealPlanController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, mealPlanController.getMealPlan);
router.post('/generate', protect, mealPlanController.generateWeeklyPlan);

module.exports = router;
