const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  weekStartDate: {
    type: Date,
    required: true,
  },
  days: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    meals: {
      breakfast: {
        recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
        recipeTitle: String,
        image: String,
        prepTime: Number,
        isCompleted: { type: Boolean, default: false },
      },
      lunch: {
        recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
        recipeTitle: String,
        image: String,
        prepTime: Number,
        isCompleted: { type: Boolean, default: false },
      },
      dinner: {
        recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
        recipeTitle: String,
        image: String,
        prepTime: Number,
        isCompleted: { type: Boolean, default: false },
      },
      snack: {
        recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
        recipeTitle: String,
        image: String,
        prepTime: Number,
        isCompleted: { type: Boolean, default: false },
      },
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);
