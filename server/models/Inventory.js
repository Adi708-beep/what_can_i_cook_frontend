const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Ingredient name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Vegetables', 'Fruits', 'Dairy', 'Meat', 'Seafood', 
      'Eggs', 'Grains', 'Pasta', 'Spices', 'Sauces', 
      'Frozen', 'Snacks', 'Baking', 'Other'
    ],
    default: 'Other',
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 1,
  },
  unit: {
    type: String,
    default: 'pcs',
    trim: true,
  },
  location: {
    type: String,
    enum: ['fridge', 'pantry', 'freezer'],
    required: true,
    default: 'fridge',
    index: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    index: true,
  },
  image: {
    type: String,
    default: '',
  },
  freshness: {
    type: String,
    enum: ['Fresh', 'Within 7 days', 'Within 3 days', 'Expires tomorrow', 'Expires today', 'Expired'],
    default: 'Fresh',
  },
  source: {
    type: String,
    enum: ['manual', 'ai_scan', 'recipe_deduction'],
    default: 'manual',
  },
  confidence: {
    type: Number,
    default: 1.0,
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

inventorySchema.index({ userId: 1, location: 1 });
inventorySchema.index({ userId: 1, expiryDate: 1 });

module.exports = mongoose.model('Inventory', inventorySchema);
