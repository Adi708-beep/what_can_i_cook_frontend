const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, shoppingListController.getShoppingList);
router.post('/', protect, shoppingListController.addShoppingItem);
router.patch('/:id/toggle', protect, shoppingListController.togglePurchased);
router.delete('/:id', protect, shoppingListController.deleteShoppingItem);
router.post('/clear-completed', protect, shoppingListController.clearCompleted);

module.exports = router;
