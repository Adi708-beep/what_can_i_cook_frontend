exports.getAnalytics = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        foodWasteScore: 87,
        foodWasteGrade: 'Excellent',
        ingredientsUsedBeforeExpiry: 38,
        ingredientsDiscarded: 2,
        recipesCooked: 24,
        estimatedMoneySavedUSD: 168.50,
        streakDays: 7,
        weeklyTrend: [
          { week: 'Week 1', score: 72, savedUSD: 28 },
          { week: 'Week 2', score: 78, savedUSD: 36 },
          { week: 'Week 3', score: 82, savedUSD: 44 },
          { week: 'Week 4', score: 87, savedUSD: 60.50 }
        ],
        achievementBadges: [
          { title: 'First Scan', description: 'Scanned your kitchen with AI vision', icon: '📸', unlocked: true },
          { title: 'Waste Warrior', description: 'Used 25+ ingredients before expiry', icon: '🛡️', unlocked: true },
          { title: '7-Day Streak', description: 'Cooked meals 7 days in a row', icon: '🔥', unlocked: true },
          { title: 'Expiry Hero', description: 'Zero items expired this week', icon: '⭐', unlocked: false }
        ]
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'GET_ANALYTICS_ERROR', message: error.message },
    });
  }
};
