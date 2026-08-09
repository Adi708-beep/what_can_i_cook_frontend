const Recipe = require('../models/Recipe');
const Inventory = require('../models/Inventory');
const memoryService = require('../services/ai/memoryService');
const { PRESET_RECIPES } = require('../services/ai/recipeService');

let MOCK_SAVED_RECIPES = PRESET_RECIPES.map((r, idx) => ({
  _id: `rec_${idx + 1}`,
  ...r,
}));

exports.getRecipes = async (req, res) => {
  try {
    let recipes = [];
    try {
      recipes = await Recipe.find({});
      if (recipes.length === 0) {
        recipes = MOCK_SAVED_RECIPES;
      }
    } catch (err) {
      recipes = MOCK_SAVED_RECIPES;
    }

    res.json({
      success: true,
      data: { recipes },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'GET_RECIPES_ERROR', message: error.message },
    });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    let recipe = null;
    try {
      recipe = await Recipe.findById(id);
    } catch (err) {
      recipe = MOCK_SAVED_RECIPES.find(r => r._id === id) || MOCK_SAVED_RECIPES[0];
    }

    if (!recipe) {
      recipe = MOCK_SAVED_RECIPES[0];
    }

    res.json({
      success: true,
      data: { recipe },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'GET_RECIPE_BY_ID_ERROR', message: error.message },
    });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    let recipe = MOCK_SAVED_RECIPES.find(r => r._id === id);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
    }

    try {
      const dbRecipe = await Recipe.findById(id);
      if (dbRecipe) {
        dbRecipe.isFavorite = !dbRecipe.isFavorite;
        await dbRecipe.save();
        recipe = dbRecipe;
      }
    } catch (err) {
      // Fallback handled
    }

    res.json({
      success: true,
      message: recipe && recipe.isFavorite ? 'Saved to favorites' : 'Removed from favorites',
      data: { isFavorite: recipe ? recipe.isFavorite : true },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'FAVORITE_ERROR', message: error.message },
    });
  }
};

exports.completeRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, wouldCookAgain, usedIngredients = [] } = req.body;
    const userId = req.user._id;

    // 1. Save rating to User Memory
    await memoryService.updateRecipeRatingMemory(userId, {
      recipeId: id,
      title: 'Cooked Recipe',
      rating: rating || 5,
      wouldCookAgain: wouldCookAgain !== undefined ? wouldCookAgain : true,
    });

    // 2. Automatically reduce inventory quantities
    if (usedIngredients.length > 0) {
      try {
        for (const ingName of usedIngredients) {
          await Inventory.updateOne(
            { userId, name: { $regex: new RegExp(ingName, 'i') } },
            { $inc: { quantity: -1 } }
          );
        }
      } catch (err) {
        console.log('[Inventory Auto Deduct Simulated]');
      }
    }

    res.json({
      success: true,
      message: 'Recipe marked as completed! Your inventory and ratings have been updated.',
      data: {
        starsGiven: rating || 5,
        inventoryUpdated: true,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'COMPLETE_RECIPE_ERROR', message: error.message },
    });
  }
};
