const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { protect } = require('../middlewares/auth');

router.post('/generate-recipe', protect, aiController.generateRecipe);
router.post('/substitute', protect, aiController.getSubstitutions);
router.post('/adapt-recipe', protect, aiController.adaptRecipe);
router.post('/chat', protect, aiController.cookingAssistantChat);

module.exports = router;
