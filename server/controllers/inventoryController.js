const Inventory = require('../models/Inventory');
const expiryService = require('../services/expiryService');

// In-Memory fallback store for local development if MongoDB is offline
let MOCK_INVENTORY_STORE = [
  { _id: 'inv_1', userId: '60d0fe4f5311236168a109ca', name: 'Fresh Spinach', category: 'Vegetables', quantity: 2, unit: 'bunches', location: 'fridge', expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), freshness: 'Within 3 days', confidence: 0.95 },
  { _id: 'inv_2', userId: '60d0fe4f5311236168a109ca', name: 'Whole Milk', category: 'Dairy', quantity: 1, unit: 'carton', location: 'fridge', expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), freshness: 'Expires tomorrow', confidence: 0.98 },
  { _id: 'inv_3', userId: '60d0fe4f5311236168a109ca', name: 'Large Eggs', category: 'Eggs', quantity: 8, unit: 'pcs', location: 'fridge', expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), freshness: 'Within 7 days', confidence: 0.96 },
  { _id: 'inv_4', userId: '60d0fe4f5311236168a109ca', name: 'Cheddar Cheese', category: 'Dairy', quantity: 250, unit: 'g', location: 'fridge', expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), freshness: 'Within 7 days', confidence: 0.91 },
  { _id: 'inv_5', userId: '60d0fe4f5311236168a109ca', name: 'Chicken Breast', category: 'Meat', quantity: 500, unit: 'g', location: 'fridge', expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), freshness: 'Within 3 days', confidence: 0.89 },
  { _id: 'inv_6', userId: '60d0fe4f5311236168a109ca', name: 'Tomatoes', category: 'Vegetables', quantity: 5, unit: 'pcs', location: 'fridge', expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), freshness: 'Within 3 days', confidence: 0.94 },
  { _id: 'inv_7', userId: '60d0fe4f5311236168a109ca', name: 'Penne Pasta', category: 'Pasta', quantity: 2, unit: 'boxes', location: 'pantry', expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), freshness: 'Fresh', confidence: 0.99 },
  { _id: 'inv_8', userId: '60d0fe4f5311236168a109ca', name: 'Extra Virgin Olive Oil', category: 'Sauces', quantity: 1, unit: 'bottle', location: 'pantry', expiryDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000), freshness: 'Fresh', confidence: 0.99 },
  { _id: 'inv_9', userId: '60d0fe4f5311236168a109ca', name: 'Garlic Bulbs', category: 'Vegetables', quantity: 4, unit: 'cloves', location: 'pantry', expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), freshness: 'Fresh', confidence: 0.95 },
  { _id: 'inv_10', userId: '60d0fe4f5311236168a109ca', name: 'Basmati Rice', category: 'Grains', quantity: 1, unit: 'bag', location: 'pantry', expiryDate: new Date(Date.now() + 200 * 24 * 60 * 60 * 1000), freshness: 'Fresh', confidence: 0.98 },
  { _id: 'inv_11', userId: '60d0fe4f5311236168a109ca', name: 'Frozen Peas', category: 'Frozen', quantity: 1, unit: 'bag', location: 'freezer', expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), freshness: 'Fresh', confidence: 0.95 },
  { _id: 'inv_12', userId: '60d0fe4f5311236168a109ca', name: 'Salmon Fillets', category: 'Seafood', quantity: 2, unit: 'pcs', location: 'freezer', expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), freshness: 'Fresh', confidence: 0.92 }
];

exports.getInventory = async (req, res) => {
  try {
    const { location, category, search, sortBy } = req.query;
    const userId = req.user._id;

    let items = [];
    try {
      const query = { userId };
      if (location) query.location = location;
      if (category) query.category = category;
      if (search) query.name = { $regex: search, $options: 'i' };

      items = await Inventory.find(query);
    } catch (dbErr) {
      // Fallback
      items = MOCK_INVENTORY_STORE.filter(item => {
        if (location && item.location !== location) return false;
        if (category && item.category !== category) return false;
        if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      });
    }

    // Process expiry status & sort by urgency if requested
    const prioritized = expiryService.prioritizeInventoryByUrgency(items);

    res.json({
      success: true,
      count: prioritized.length,
      data: { inventory: prioritized },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'GET_INVENTORY_ERROR', message: error.message },
    });
  }
};

exports.addIngredient = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, category, quantity, unit, location, expiryDate, notes } = req.body;

    const freshnessInfo = expiryService.calculateFreshnessStatus(expiryDate);

    const newItemData = {
      userId,
      name,
      category: category || 'Other',
      quantity: quantity !== undefined ? Number(quantity) : 1,
      unit: unit || 'pcs',
      location: location || 'fridge',
      expiryDate: expiryDate ? new Date(expiryDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      freshness: freshnessInfo.status,
      notes: notes || '',
      source: 'manual',
    };

    let createdItem;
    try {
      createdItem = await Inventory.create(newItemData);
    } catch (dbErr) {
      createdItem = { _id: `inv_${Date.now()}`, ...newItemData };
      MOCK_INVENTORY_STORE.unshift(createdItem);
    }

    res.status(201).json({
      success: true,
      message: `${name} added to ${newItemData.location}`,
      data: { ingredient: createdItem },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'ADD_INGREDIENT_ERROR', message: error.message },
    });
  }
};

exports.updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.expiryDate) {
      const freshnessInfo = expiryService.calculateFreshnessStatus(updates.expiryDate);
      updates.freshness = freshnessInfo.status;
    }

    let updatedItem;
    try {
      updatedItem = await Inventory.findByIdAndUpdate(id, updates, { new: true });
    } catch (dbErr) {
      const index = MOCK_INVENTORY_STORE.findIndex(item => item._id === id);
      if (index !== -1) {
        MOCK_INVENTORY_STORE[index] = { ...MOCK_INVENTORY_STORE[index], ...updates };
        updatedItem = MOCK_INVENTORY_STORE[index];
      }
    }

    res.json({
      success: true,
      message: 'Ingredient updated',
      data: { ingredient: updatedItem },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'UPDATE_INGREDIENT_ERROR', message: error.message },
    });
  }
};

exports.deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await Inventory.findByIdAndDelete(id);
    } catch (dbErr) {
      MOCK_INVENTORY_STORE = MOCK_INVENTORY_STORE.filter(item => item._id !== id);
    }

    res.json({
      success: true,
      message: 'Ingredient removed from inventory',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'DELETE_INGREDIENT_ERROR', message: error.message },
    });
  }
};

exports.bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;
    try {
      await Inventory.deleteMany({ _id: { $in: ids } });
    } catch (dbErr) {
      MOCK_INVENTORY_STORE = MOCK_INVENTORY_STORE.filter(item => !ids.includes(item._id));
    }

    res.json({
      success: true,
      message: `${ids.length} items deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'BULK_DELETE_ERROR', message: error.message },
    });
  }
};
