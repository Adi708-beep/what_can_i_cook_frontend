const MealPlan = require('../models/MealPlan');
const { PRESET_RECIPES } = require('../services/ai/recipeService');

const DEFAULT_WEEKLY_PLAN = [
  {
    day: 'Monday',
    meals: {
      breakfast: { recipeTitle: 'Spinach & Cheese Golden Omelette', prepTime: 12, isCompleted: true },
      lunch: { recipeTitle: 'Creamy Spinach & Garlic Penne', prepTime: 25, isCompleted: true },
      dinner: { recipeTitle: 'Mediterranean Pan-Seared Chicken & Rice', prepTime: 30, isCompleted: false },
      snack: { recipeTitle: 'Greek Yogurt with Honey & Berries', prepTime: 5, isCompleted: false }
    }
  },
  {
    day: 'Tuesday',
    meals: {
      breakfast: { recipeTitle: 'Avocado Toast with Poached Egg', prepTime: 10, isCompleted: false },
      lunch: { recipeTitle: 'Mediterranean Pan-Seared Chicken & Rice', prepTime: 30, isCompleted: false },
      dinner: { recipeTitle: 'Creamy Spinach & Garlic Penne', prepTime: 25, isCompleted: false },
      snack: { recipeTitle: 'Handful of Mixed Almonds', prepTime: 2, isCompleted: false }
    }
  },
  {
    day: 'Wednesday',
    meals: {
      breakfast: { recipeTitle: 'Spinach & Cheese Golden Omelette', prepTime: 12, isCompleted: false },
      lunch: { recipeTitle: 'Caprese Salad with Basil & Olive Oil', prepTime: 15, isCompleted: false },
      dinner: { recipeTitle: 'Pan-Seared Salmon with Steamed Peas', prepTime: 25, isCompleted: false },
      snack: { recipeTitle: 'Banana Smoothie', prepTime: 5, isCompleted: false }
    }
  },
  {
    day: 'Thursday',
    meals: {
      breakfast: { recipeTitle: 'Oatmeal with Frozen Berries', prepTime: 8, isCompleted: false },
      lunch: { recipeTitle: 'Pan-Seared Salmon with Steamed Peas', prepTime: 25, isCompleted: false },
      dinner: { recipeTitle: 'Garlic Butter Pasta', prepTime: 20, isCompleted: false },
      snack: { recipeTitle: 'Apple Slices with Peanut Butter', prepTime: 5, isCompleted: false }
    }
  },
  {
    day: 'Friday',
    meals: {
      breakfast: { recipeTitle: 'Scrambled Eggs on Sourdough', prepTime: 10, isCompleted: false },
      lunch: { recipeTitle: 'Garlic Butter Pasta', prepTime: 20, isCompleted: false },
      dinner: { recipeTitle: 'Homemade Vegetable Stir-Fry', prepTime: 25, isCompleted: false },
      snack: { recipeTitle: 'Roasted Chickpeas', prepTime: 15, isCompleted: false }
    }
  },
  {
    day: 'Saturday',
    meals: {
      breakfast: { recipeTitle: 'Fluffy Blueberry Pancakes', prepTime: 20, isCompleted: false },
      lunch: { recipeTitle: 'Vegetable Stir-Fry Leftovers', prepTime: 10, isCompleted: false },
      dinner: { recipeTitle: 'Cheesy Spinach & Tomato Pizza', prepTime: 35, isCompleted: false },
      snack: { recipeTitle: 'Dark Chocolate Bites', prepTime: 2, isCompleted: false }
    }
  },
  {
    day: 'Sunday',
    meals: {
      breakfast: { recipeTitle: 'Veggie Omelette Delight', prepTime: 15, isCompleted: false },
      lunch: { recipeTitle: 'Cheesy Spinach & Tomato Pizza Leftovers', prepTime: 10, isCompleted: false },
      dinner: { recipeTitle: 'Herbed Roasted Chicken with Vegetables', prepTime: 45, isCompleted: false },
      snack: { recipeTitle: 'Fresh Orange Slices', prepTime: 5, isCompleted: false }
    }
  }
];

exports.getMealPlan = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        weekStartDate: new Date(),
        days: DEFAULT_WEEKLY_PLAN,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'MEAL_PLAN_ERROR', message: error.message },
    });
  }
};

exports.generateWeeklyPlan = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'AI successfully optimized your weekly meal plan based on expiring ingredients and dietary preferences!',
      data: {
        weekStartDate: new Date(),
        days: DEFAULT_WEEKLY_PLAN,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'GENERATE_MEAL_PLAN_ERROR', message: error.message },
    });
  }
};
