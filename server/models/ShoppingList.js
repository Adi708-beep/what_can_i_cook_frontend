const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  items: [{
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Produce', 'Dairy', 'Meat & Seafood', 'Pantry', 'Frozen', 'Bakery', 'Other'],
      default: 'Other',
    },
    quantity: { type: Number, default: 1 },
    unit: { type: String, default: 'pcs' },
    isPurchased: { type: Boolean, default: false },
    recipeSource: { type: String, default: '' },
    notes: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);
