const mongoose = require('mongoose');

const scanHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  scanType: {
    type: String,
    enum: ['fridge', 'pantry', 'freezer', 'countertop'],
    default: 'fridge',
  },
  detectedIngredients: [{
    name: String,
    category: String,
    estimatedQuantity: Number,
    unit: String,
    confidence: Number,
    expiryDays: Number,
    confirmed: { type: Boolean, default: false }
  }],
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ScanHistory', scanHistorySchema);
