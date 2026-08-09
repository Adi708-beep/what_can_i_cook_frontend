let MOCK_SHOPPING_LIST = [
  { _id: 'shop_1', name: 'Heavy Cream', category: 'Dairy', quantity: 1, unit: 'carton', isPurchased: false, recipeSource: 'Creamy Spinach Pasta' },
  { _id: 'shop_2', name: 'Fresh Basil', category: 'Produce', quantity: 1, unit: 'bunch', isPurchased: false, recipeSource: 'Caprese Salad' },
  { _id: 'shop_3', name: 'Butter', category: 'Dairy', quantity: 1, unit: 'pack', isPurchased: true, recipeSource: 'Spinach Omelette' },
  { _id: 'shop_4', name: 'Black Pepper', category: 'Pantry', quantity: 1, unit: 'jar', isPurchased: true, recipeSource: 'General Kitchen' },
];

exports.getShoppingList = async (req, res) => {
  try {
    res.json({
      success: true,
      data: { items: MOCK_SHOPPING_LIST },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'GET_SHOPPING_LIST_ERROR', message: error.message },
    });
  }
};

exports.addShoppingItem = async (req, res) => {
  try {
    const { name, category, quantity, unit, recipeSource } = req.body;
    const newItem = {
      _id: `shop_${Date.now()}`,
      name,
      category: category || 'Produce',
      quantity: quantity || 1,
      unit: unit || 'pcs',
      isPurchased: false,
      recipeSource: recipeSource || 'Manual',
    };
    MOCK_SHOPPING_LIST.unshift(newItem);

    res.status(201).json({
      success: true,
      message: `${name} added to shopping list`,
      data: { item: newItem },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'ADD_SHOPPING_ITEM_ERROR', message: error.message },
    });
  }
};

exports.togglePurchased = async (req, res) => {
  try {
    const { id } = req.params;
    const item = MOCK_SHOPPING_LIST.find(i => i._id === id);
    if (item) {
      item.isPurchased = !item.isPurchased;
    }
    res.json({
      success: true,
      data: { item },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'TOGGLE_SHOPPING_ITEM_ERROR', message: error.message },
    });
  }
};

exports.deleteShoppingItem = async (req, res) => {
  try {
    const { id } = req.params;
    MOCK_SHOPPING_LIST = MOCK_SHOPPING_LIST.filter(i => i._id !== id);
    res.json({
      success: true,
      message: 'Item removed from shopping list',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'DELETE_SHOPPING_ITEM_ERROR', message: error.message },
    });
  }
};

exports.clearCompleted = async (req, res) => {
  try {
    MOCK_SHOPPING_LIST = MOCK_SHOPPING_LIST.filter(i => !i.isPurchased);
    res.json({
      success: true,
      message: 'Cleared completed items',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'CLEAR_COMPLETED_ERROR', message: error.message },
    });
  }
};
