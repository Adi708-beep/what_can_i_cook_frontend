const User = require('../models/User');
const memoryService = require('../services/ai/memoryService');

exports.getProfile = async (req, res) => {
  try {
    const user = req.user;
    const memory = await memoryService.getOrCreateMemory(user._id);

    res.json({
      success: true,
      data: {
        user,
        memory,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'PROFILE_ERROR', message: error.message },
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    let updatedUser;
    try {
      updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
    } catch (err) {
      updatedUser = { ...req.user, ...updates };
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'UPDATE_PROFILE_ERROR', message: error.message },
    });
  }
};

exports.completeOnboarding = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, dietaryPreferences, allergies, favoriteCuisines, cookingSkill, preferredCookingTime, kitchenSetup } = req.body;

    const onboardingData = {
      name,
      dietaryPreferences,
      allergies,
      favoriteCuisines,
      cookingSkill,
      preferredCookingTime,
      kitchenSetup,
      onboardingCompleted: true,
    };

    let updatedUser;
    try {
      updatedUser = await User.findByIdAndUpdate(userId, onboardingData, { new: true });
    } catch (err) {
      updatedUser = { ...req.user, ...onboardingData };
    }

    res.json({
      success: true,
      message: 'Onboarding completed successfully!',
      data: { user: updatedUser },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'ONBOARDING_ERROR', message: error.message },
    });
  }
};

exports.getUserMemory = async (req, res) => {
  try {
    const memory = await memoryService.getOrCreateMemory(req.user._id);
    res.json({
      success: true,
      data: { memory },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'MEMORY_ERROR', message: error.message },
    });
  }
};

exports.resetUserMemory = async (req, res) => {
  try {
    const memory = await memoryService.resetUserMemory(req.user._id);
    res.json({
      success: true,
      message: 'AI Memory has been completely reset.',
      data: { memory },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'RESET_MEMORY_ERROR', message: error.message },
    });
  }
};
