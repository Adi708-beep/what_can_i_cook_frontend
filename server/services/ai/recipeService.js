const aiService = require('./aiService');

const PRESET_RECIPES = [
  {
    title: "Creamy Spinach & Garlic Penne",
    description: "A rich, velvety pasta dish combining fresh spinach, garlic, and cheese. Quick to prepare and uses expiring greens.",
    servings: 2,
    prepTime: 10,
    cookTime: 15,
    difficulty: "Easy",
    calories: 520,
    protein: 22,
    carbs: 65,
    fat: 18,
    cuisine: "Italian",
    dietaryTags: ["Vegetarian", "High Protein"],
    ingredients: [
      { name: "Penne Pasta", amount: "200g", isAvailable: true, isExpiring: false },
      { name: "Fresh Spinach", amount: "2 cups", isAvailable: true, isExpiring: true },
      { name: "Garlic Bulbs", amount: "3 cloves", isAvailable: true, isExpiring: false },
      { name: "Whole Milk", amount: "1/2 cup", isAvailable: true, isExpiring: true },
      { name: "Cheddar Cheese", amount: "1/2 cup", isAvailable: true, isExpiring: false },
      { name: "Extra Virgin Olive Oil", amount: "2 tbsp", isAvailable: true, isExpiring: false },
      { name: "Heavy Cream", amount: "1/4 cup", isAvailable: false, isExpiring: false }
    ],
    instructions: [
      { step: 1, title: "Boil Pasta", description: "Bring a large pot of salted water to boil. Cook penne until al dente (approx 10 minutes). Drain and set aside.", timerMinutes: 10 },
      { step: 2, title: "Sauté Aromatics & Spinach", description: "Heat olive oil in a pan over medium heat. Add minced garlic and cook for 1 minute. Toss in spinach until wilted.", timerMinutes: 3 },
      { step: 3, title: "Simmer Sauce & Combine", description: "Pour in milk and stir in cheese until smooth. Toss pasta into the pan until coated generously.", timerMinutes: 4 }
    ],
    substitutions: [
      { ingredient: "Heavy Cream", alternatives: ["Whole Milk + Butter", "Greek Yogurt"], reason: "Milk with cheese creates a perfect rich texture without heavy cream." }
    ],
    tips: ["Save 1/2 cup of pasta cooking water to thin out the cheese sauce if needed."],
    missingIngredients: [
      { name: "Heavy Cream", amount: "1/4 cup", category: "Dairy" }
    ],
    usedInventoryIngredients: ["Penne Pasta", "Fresh Spinach", "Garlic Bulbs", "Whole Milk", "Cheddar Cheese", "Extra Virgin Olive Oil"],
    matchScore: 94,
    expiryPriorityScore: 90,
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281293?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Spinach & Cheese Golden Omelette",
    description: "Fluffy 3-egg omelette stuffed with fresh sautéed spinach and melted cheese. Ready in under 12 minutes.",
    servings: 1,
    prepTime: 5,
    cookTime: 7,
    difficulty: "Easy",
    calories: 380,
    protein: 26,
    carbs: 6,
    fat: 28,
    cuisine: "American",
    dietaryTags: ["Keto", "High Protein", "Vegetarian", "Gluten Free"],
    ingredients: [
      { name: "Large Eggs", amount: "3 pcs", isAvailable: true, isExpiring: true },
      { name: "Fresh Spinach", amount: "1 cup", isAvailable: true, isExpiring: true },
      { name: "Cheddar Cheese", amount: "1/3 cup shredded", isAvailable: true, isExpiring: false },
      { name: "Butter", amount: "1 tbsp", isAvailable: true, isExpiring: false }
    ],
    instructions: [
      { step: 1, title: "Whisk Eggs", description: "Crack eggs into a bowl, season with salt and pepper, and whisk vigorously until frothy.", timerMinutes: 2 },
      { step: 2, title: "Wilt Spinach", description: "Melt half the butter in a non-stick skillet over medium-low heat. Sauté spinach for 1-2 minutes until tender, then set aside.", timerMinutes: 2 },
      { step: 3, title: "Cook Omelette", description: "Pour eggs into pan. As eggs set, lift edges with a spatula. Sprinkle spinach and cheese over one half, fold, and serve warm.", timerMinutes: 3 }
    ],
    substitutions: [
      { ingredient: "Cheddar Cheese", alternatives: ["Feta", "Mozzarella", "Parmesan"], reason: "Any melty or crumbly cheese works fantastically." }
    ],
    tips: ["Cook over medium-low heat to ensure the eggs stay velvety and soft."],
    missingIngredients: [],
    usedInventoryIngredients: ["Large Eggs", "Fresh Spinach", "Cheddar Cheese"],
    matchScore: 98,
    expiryPriorityScore: 95,
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Mediterranean Pan-Seared Chicken & Rice",
    description: "Juicy garlic-herb chicken breasts paired with fluffy basmati rice and roasted tomatoes.",
    servings: 2,
    prepTime: 12,
    cookTime: 20,
    difficulty: "Medium",
    calories: 580,
    protein: 48,
    carbs: 52,
    fat: 16,
    cuisine: "Mediterranean",
    dietaryTags: ["High Protein", "Gluten Free", "Dairy Free"],
    ingredients: [
      { name: "Chicken Breast", amount: "500g", isAvailable: true, isExpiring: true },
      { name: "Basmati Rice", amount: "1 cup", isAvailable: true, isExpiring: false },
      { name: "Tomatoes", amount: "2 pcs sliced", isAvailable: true, isExpiring: true },
      { name: "Garlic Bulbs", amount: "2 cloves", isAvailable: true, isExpiring: false },
      { name: "Extra Virgin Olive Oil", amount: "2 tbsp", isAvailable: true, isExpiring: false }
    ],
    instructions: [
      { step: 1, title: "Cook Rice", description: "Rinse rice and simmer in 2 cups of water with a pinch of salt for 15 minutes until fluffy.", timerMinutes: 15 },
      { step: 2, title: "Sear Chicken", description: "Season chicken with salt, pepper, minced garlic, and olive oil. Sear in a hot skillet for 6-7 minutes per side until golden brown.", timerMinutes: 14 },
      { step: 3, title: "Blister Tomatoes & Serve", description: "Toss tomato slices into the pan juices for 2 minutes. Slice chicken and serve over warm basmati rice.", timerMinutes: 3 }
    ],
    substitutions: [],
    tips: ["Let chicken rest for 5 minutes before slicing to retain maximum juices."],
    missingIngredients: [],
    usedInventoryIngredients: ["Chicken Breast", "Basmati Rice", "Tomatoes", "Garlic Bulbs", "Extra Virgin Olive Oil"],
    matchScore: 96,
    expiryPriorityScore: 88,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800"
  }
];

async function generateRecipes({ inventory = [], userPreferences = {}, query = '' }) {
  const prompt = `Generate 3 personalized recipes based on inventory: ${JSON.stringify(inventory.map(i => i.name))}, user diet: ${JSON.stringify(userPreferences.dietaryPreferences || [])}, query: "${query}". Return structured JSON array.`;
  const externalResult = await aiService.generateJsonContent(prompt);
  
  if (externalResult && Array.isArray(externalResult.recipes)) {
    return externalResult.recipes;
  }

  // Filter or return preset recipes tailored to available inventory
  return PRESET_RECIPES.map(recipe => {
    // Check match against user's specific dietary restrictions if any
    let score = recipe.matchScore;
    if (query && recipe.title.toLowerCase().includes(query.toLowerCase())) {
      score += 5;
    }
    return {
      ...recipe,
      matchScore: Math.min(score, 100),
    };
  });
}

module.exports = {
  generateRecipes,
  PRESET_RECIPES,
};
