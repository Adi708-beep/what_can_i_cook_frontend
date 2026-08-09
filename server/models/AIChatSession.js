const mongoose = require('mongoose');

const aiChatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  context: {
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    stepNumber: Number,
  },
  messages: [{
    sender: {
      type: String,
      enum: ['user', 'ai'],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('AIChatSession', aiChatSessionSchema);
