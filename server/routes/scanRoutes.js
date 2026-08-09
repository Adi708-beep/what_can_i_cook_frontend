const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.post('/', protect, upload.single('image'), scanController.uploadAndScan);
router.post('/confirm', protect, scanController.confirmScanIngredients);
router.get('/history', protect, scanController.getScanHistory);

module.exports = router;
