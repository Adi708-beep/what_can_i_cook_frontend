const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  dietaryPreferences: [{
    type: String,
    enum: ['Everything', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'High Protein', 'Low Carb', 'Gluten Free', 'Dairy Free'],
  }],
  allergies: [{
    type: String,
  }],
  favoriteCuisines: [{
    type: String,
    enum: ['Indian', 'Italian', 'Chinese', 'Japanese', 'Thai', 'Mexican', 'Mediterranean', 'Korean', 'American'],
  }],
  cookingSkill: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate',
  },
  defaultServingSize: {
    type: Number,
    default: 2,
  },
  preferredCookingTime: {
    type: String,
    enum: ['Under 15 minutes', '15–30 minutes', '30–60 minutes', '60+ minutes'],
    default: '15–30 minutes',
  },
  kitchenSetup: [{
    type: String,
    enum: ['Fridge', 'Freezer', 'Pantry', 'Oven', 'Microwave', 'Air fryer', 'Pressure cooker', 'Rice cooker', 'Blender', 'Stovetop'],
  }],
  nutritionPreferences: {
    maxCalories: Number,
    minProtein: Number,
    maxCarbs: Number,
  },
  onboardingCompleted: {
    type: Boolean,
    default: false,
  },
  lastLoginAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
