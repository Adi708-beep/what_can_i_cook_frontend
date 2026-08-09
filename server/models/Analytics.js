const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  foodWasteScore: {
    type: Number,
    default: 85, // percentage score (0-100)
  },
  ingredientsUsedBeforeExpiry: {
    type: Number,
    default: 24,
  },
  ingredientsDiscarded: {
    type: Number,
    default: 2,
  },
  recipesCooked: {
    type: Number,
    default: 18,
  },
  estimatedMoneySavedUSD: {
    type: Number,
    default: 145.50,
  },
  streakDays: {
    type: Number,
    default: 7,
  },
  weeklyProgress: [{
    weekLabel: String,
    score: Number,
    savedUSD: Number,
    cookedCount: Number,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Analytics', analyticsSchema);
