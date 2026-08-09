const mongoose = require('mongoose');

const userMemorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  dislikedIngredients: [{
    type: String,
    trim: true,
  }],
  favoriteIngredients: [{
    type: String,
    trim: true,
  }],
  frequentCuisines: [{
    cuisine: String,
    count: { type: Number, default: 1 },
  }],
  frequentSubstitutions: [{
    original: String,
    substitutedWith: String,
    count: { type: Number, default: 1 },
  }],
  spicePreference: {
    type: String,
    enum: ['Mild', 'Medium', 'Spicy', 'Extra Spicy'],
    default: 'Medium',
  },
  learnedPreferences: [{
    key: String,
    value: String,
    confidence: { type: Number, default: 0.5 },
  }],
  recipeRatings: [{
    recipeId: String,
    title: String,
    rating: Number,
    wouldCookAgain: Boolean,
    timestamp: { type: Date, default: Date.now }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserMemory', userMemorySchema);
