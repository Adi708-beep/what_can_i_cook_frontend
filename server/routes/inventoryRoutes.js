const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { addInventorySchema } = require('../validators/inventoryValidator');

router.get('/', protect, inventoryController.getInventory);
router.post('/', protect, validate(addInventorySchema), inventoryController.addIngredient);
router.patch('/:id', protect, inventoryController.updateIngredient);
router.delete('/:id', protect, inventoryController.deleteIngredient);
router.post('/bulk-delete', protect, inventoryController.bulkDelete);

module.exports = router;
