const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  servings: {
    type: Number,
    default: 2,
  },
  prepTime: {
    type: Number, // in minutes
    default: 10,
  },
  cookTime: {
    type: Number, // in minutes
    default: 15,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy',
  },
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  cuisine: String,
  dietaryTags: [String],
  ingredients: [{
    name: String,
    amount: String,
    quantity: Number,
    unit: String,
    isAvailable: Boolean,
    isExpiring: Boolean,
  }],
  instructions: [{
    step: Number,
    title: String,
    description: String,
    timerMinutes: Number,
  }],
  substitutions: [{
    ingredient: String,
    alternatives: [String],
    reason: String,
  }],
  tips: [String],
  missingIngredients: [{
    name: String,
    amount: String,
    category: String,
  }],
  usedInventoryIngredients: [String],
  matchScore: {
    type: Number,
    default: 90,
  },
  expiryPriorityScore: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  ratings: [{
    userId: mongoose.Schema.Types.ObjectId,
    rating: Number,
    review: String,
    createdAt: { type: Date, default: Date.now }
  }],
  averageRating: {
    type: Number,
    default: 4.8,
  },
}, {
  timestamps: true,
});

recipeSchema.index({ userId: 1, isFavorite: 1 });
recipeSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);
