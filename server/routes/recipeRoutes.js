const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, recipeController.getRecipes);
router.get('/:id', protect, recipeController.getRecipeById);
router.post('/:id/favorite', protect, recipeController.toggleFavorite);
router.post('/:id/complete', protect, recipeController.completeRecipe);

module.exports = router;
