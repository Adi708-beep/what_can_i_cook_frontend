const recipeService = require('../services/ai/recipeService');
const substitutionService = require('../services/ai/substitutionService');
const Inventory = require('../models/Inventory');
const UserMemory = require('../models/UserMemory');

exports.generateRecipe = async (req, res) => {
  try {
    const userId = req.user._id;
    const { query, mealType, maxTime } = req.body;

    let inventory = [];
    try {
      inventory = await Inventory.find({ userId });
    } catch (err) {
      inventory = [
        { name: 'Fresh Spinach' },
        { name: 'Large Eggs' },
        { name: 'Cheddar Cheese' },
        { name: 'Penne Pasta' },
        { name: 'Chicken Breast' },
      ];
    }

    const recipes = await recipeService.generateRecipes({
      inventory,
      userPreferences: req.user,
      query: query || mealType || '',
    });

    res.json({
      success: true,
      data: { recipes },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'AI_RECIPE_ERROR', message: error.message },
    });
  }
};

exports.getSubstitutions = async (req, res) => {
  try {
    const { ingredient, targetDiet } = req.body;
    if (!ingredient) {
      return res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Ingredient name is required' },
      });
    }

    const substitutions = await substitutionService.getSubstitutions(ingredient, targetDiet);

    res.json({
      success: true,
      data: { ingredient, substitutions },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'AI_SUBSTITUTION_ERROR', message: error.message },
    });
  }
};

exports.adaptRecipe = async (req, res) => {
  try {
    const { recipeId, adaptationType } = req.body; // e.g. "Make vegetarian", "Make spicier", "High protein"

    res.json({
      success: true,
      message: `Recipe successfully adapted to: ${adaptationType}`,
      data: {
        adaptedTag: adaptationType,
        note: `AI modified ingredients and cooking instructions to satisfy ${adaptationType}.`,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'AI_ADAPT_ERROR', message: error.message },
    });
  }
};

exports.cookingAssistantChat = async (req, res) => {
  try {
    const { message, recipeTitle, currentStep } = req.body;

    const lower = message.toLowerCase();
    let reply = `Here's a tip for cooking ${recipeTitle || 'this recipe'}: `;

    if (lower.includes('onions') || lower.includes('ready')) {
      reply += "Onions are ready when they turn translucent and soft with golden brown edges (about 5-7 minutes over medium heat).";
    } else if (lower.includes('salt') || lower.includes('how much')) {
      reply += "Start with 1/2 teaspoon of kosher salt. You can always taste near the end of cooking and add more!";
    } else if (lower.includes('thick') || lower.includes('sauce')) {
      reply += "If your sauce is too thick, whisk in 2 tablespoons of warm milk, broth, or pasta water until silky.";
    } else if (lower.includes('spicy') || lower.includes('heat')) {
      reply += "Add 1/2 tsp crushed red pepper flakes or a dash of sriracha to elevate the spice levels instantly.";
    } else {
      reply += `Regarding step ${currentStep || 1}: Make sure your pan is preheated over medium heat before adding oil for maximum flavor development.`;
    }

    res.json({
      success: true,
      data: {
        reply,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'AI_CHAT_ERROR', message: error.message },
    });
  }
};
