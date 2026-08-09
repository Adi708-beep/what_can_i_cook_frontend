const UserMemory = require('../../models/UserMemory');

async function getOrCreateMemory(userId) {
  let memory = await UserMemory.findOne({ userId });
  if (!memory) {
    memory = await UserMemory.create({
      userId,
      dislikedIngredients: [],
      favoriteIngredients: ['Spinach', 'Garlic', 'Tomatoes', 'Eggs'],
      spicePreference: 'Medium',
      frequentCuisines: [
        { cuisine: 'Italian', count: 4 },
        { cuisine: 'Indian', count: 3 },
      ],
      recipeRatings: [],
      learnedPreferences: [
        { key: 'Favors Quick Meals', value: 'Under 20 minutes preferred', confidence: 0.85 },
        { key: 'Protein Priority', value: 'Prefers high protein breakfast', confidence: 0.90 }
      ]
    });
  }
  return memory;
}

async function updateRecipeRatingMemory(userId, { recipeId, title, rating, wouldCookAgain }) {
  const memory = await getOrCreateMemory(userId);
  memory.recipeRatings.push({ recipeId, title, rating, wouldCookAgain, timestamp: new Date() });
  memory.lastUpdated = new Date();
  await memory.save();
  return memory;
}

async function resetUserMemory(userId) {
  await UserMemory.deleteMany({ userId });
  return await getOrCreateMemory(userId);
}

module.exports = {
  getOrCreateMemory,
  updateRecipeRatingMemory,
  resetUserMemory,
};
