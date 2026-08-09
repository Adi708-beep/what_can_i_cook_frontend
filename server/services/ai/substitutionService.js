const aiService = require('./aiService');

const COMMON_SUBSTITUTIONS_DB = {
  "heavy cream": [
    { replacement: "Milk + Butter", ratio: "3/4 cup milk + 1/4 cup melted butter", compatibilityScore: 92, textureNote: "Rich and creamy, ideal for cooking sauces and soups." },
    { replacement: "Greek Yogurt", ratio: "1:1 ratio", compatibilityScore: 88, textureNote: "Adds a slight tangy flavor and extra protein boost." },
    { replacement: "Coconut Cream", ratio: "1:1 ratio", compatibilityScore: 85, textureNote: "Dairy-free option with subtle coconut hint." }
  ],
  "butter": [
    { replacement: "Extra Virgin Olive Oil", ratio: "3/4 tbsp olive oil per 1 tbsp butter", compatibilityScore: 90, textureNote: "Great for savory sautés and frying." },
    { replacement: "Coconut Oil", ratio: "1:1 ratio", compatibilityScore: 88, textureNote: "Solid at room temp, great for baking." }
  ],
  "eggs": [
    { replacement: "Flax Egg", ratio: "1 tbsp ground flax + 3 tbsp water", compatibilityScore: 86, textureNote: "Ideal binding substitute for baking." },
    { replacement: "Mashed Banana", ratio: "1/4 cup mashed banana per egg", compatibilityScore: 84, textureNote: "Adds natural sweetness and moisture." }
  ],
  "parmesan cheese": [
    { replacement: "Nutritional Yeast", ratio: "1:1 ratio", compatibilityScore: 89, textureNote: "Nutty, cheesy vegan alternative." },
    { replacement: "Pecorino Romano", ratio: "1:1 ratio", compatibilityScore: 95, textureNote: "Slightly sharper and saltier flavor." }
  ],
  "sour cream": [
    { replacement: "Plain Greek Yogurt", ratio: "1:1 ratio", compatibilityScore: 96, textureNote: "Nearly identical texture and tanginess with lower calories." }
  ]
};

async function getSubstitutions(ingredientName, targetDiet = '') {
  const normalizedKey = ingredientName.toLowerCase().trim();
  
  const prompt = `Find culinary substitutions for "${ingredientName}" considering diet "${targetDiet}". Return JSON with array of alternatives containing replacement, ratio, compatibilityScore, textureNote.`;
  const external = await aiService.generateJsonContent(prompt);
  
  if (external && Array.isArray(external.substitutions)) {
    return external.substitutions;
  }

  // Fallback to database lookup
  if (COMMON_SUBSTITUTIONS_DB[normalizedKey]) {
    return COMMON_SUBSTITUTIONS_DB[normalizedKey];
  }

  // Generic fallback
  return [
    {
      replacement: `Alternative ingredient for ${ingredientName}`,
      ratio: "1:1 ratio based on preference",
      compatibilityScore: 85,
      textureNote: "Complements the dish while maintaining original balance.",
    }
  ];
}

module.exports = {
  getSubstitutions,
  COMMON_SUBSTITUTIONS_DB,
};
