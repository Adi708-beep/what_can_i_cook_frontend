const connectDB = require('../config/database');
const User = require('../models/User');
const UserMemory = require('../models/UserMemory');
const Inventory = require('../models/Inventory');
const Recipe = require('../models/Recipe');
const { PRESET_RECIPES } = require('../services/ai/recipeService');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  const isConnected = await connectDB();
  if (!isConnected) {
    console.log('[Seed] DB connection skipped in fallback mode.');
    process.exit(0);
  }

  try {
    console.log('[Seed] Clearing existing database collections...');
    await User.deleteMany({});
    await UserMemory.deleteMany({});
    await Inventory.deleteMany({});
    await Recipe.deleteMany({});

    console.log('[Seed] Creating demo user...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    const user = await User.create({
      name: 'Aditya Saha',
      email: 'aditya@example.com',
      passwordHash,
      role: 'user',
      dietaryPreferences: ['Vegetarian', 'High Protein'],
      allergies: ['Peanuts'],
      favoriteCuisines: ['Italian', 'Indian'],
      cookingSkill: 'Intermediate',
      defaultServingSize: 2,
      preferredCookingTime: '15–30 minutes',
      onboardingCompleted: true,
    });

    console.log('[Seed] Creating user memory...');
    await UserMemory.create({
      userId: user._id,
      favoriteIngredients: ['Spinach', 'Garlic', 'Tomatoes', 'Eggs'],
      spicePreference: 'Medium',
      frequentCuisines: [{ cuisine: 'Italian', count: 4 }, { cuisine: 'Indian', count: 3 }],
    });

    console.log('[Seed] Creating initial inventory...');
    await Inventory.insertMany([
      { userId: user._id, name: 'Fresh Spinach', category: 'Vegetables', quantity: 2, unit: 'bunches', location: 'fridge', expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
      { userId: user._id, name: 'Whole Milk', category: 'Dairy', quantity: 1, unit: 'carton', location: 'fridge', expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
      { userId: user._id, name: 'Large Eggs', category: 'Eggs', quantity: 8, unit: 'pcs', location: 'fridge', expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
      { userId: user._id, name: 'Cheddar Cheese', category: 'Dairy', quantity: 250, unit: 'g', location: 'fridge', expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
      { userId: user._id, name: 'Chicken Breast', category: 'Meat', quantity: 500, unit: 'g', location: 'fridge', expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
      { userId: user._id, name: 'Penne Pasta', category: 'Pasta', quantity: 2, unit: 'boxes', location: 'pantry', expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) },
      { userId: user._id, name: 'Extra Virgin Olive Oil', category: 'Sauces', quantity: 1, unit: 'bottle', location: 'pantry', expiryDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000) },
    ]);

    console.log('[Seed] Creating starter recipes...');
    await Recipe.insertMany(PRESET_RECIPES.map(r => ({ ...r, userId: user._id })));

    console.log('[Seed] Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
