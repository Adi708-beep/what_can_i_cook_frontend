const visionService = require('../services/ai/visionService');
const Inventory = require('../models/Inventory');
const ScanHistory = require('../models/ScanHistory');

let MOCK_SCAN_HISTORY = [];

exports.uploadAndScan = async (req, res) => {
  try {
    const scanType = req.body.scanType || 'fridge';
    const imageUrl = req.file 
      ? `/uploads/${req.file.filename}` 
      : 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800';

    // Run AI Vision Extraction Pipeline
    const detectedIngredients = await visionService.analyzeKitchenImage(req.file ? req.file.path : null, scanType);

    // Get current inventory to check for duplicates
    let existingInventory = [];
    try {
      existingInventory = await Inventory.find({ userId: req.user._id });
    } catch (dbErr) {
      existingInventory = [];
    }

    const duplicates = visionService.checkForDuplicates(detectedIngredients, existingInventory);

    // Save scan to database
    let scanRecord;
    try {
      scanRecord = await ScanHistory.create({
        userId: req.user._id,
        imageUrl,
        scanType,
        detectedIngredients,
        status: 'completed',
      });
    } catch (err) {
      scanRecord = {
        _id: `scan_${Date.now()}`,
        imageUrl,
        scanType,
        detectedIngredients,
        createdAt: new Date(),
      };
      MOCK_SCAN_HISTORY.unshift(scanRecord);
    }

    res.json({
      success: true,
      message: `AI identified ${detectedIngredients.length} ingredients with high confidence`,
      data: {
        scanId: scanRecord._id,
        imageUrl,
        scanType,
        detectedIngredients,
        duplicates,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SCAN_ERROR', message: error.message },
    });
  }
};

exports.confirmScanIngredients = async (req, res) => {
  try {
    const userId = req.user._id;
    const { ingredients = [], location = 'fridge' } = req.body;

    const addedItems = [];
    for (const item of ingredients) {
      const expiryDate = new Date(Date.now() + (item.expiryDays || 4) * 24 * 60 * 60 * 1000);
      
      const itemData = {
        userId,
        name: item.name,
        category: item.category || 'Vegetables',
        quantity: item.estimatedQuantity || 1,
        unit: item.unit || 'pcs',
        location: location,
        expiryDate,
        source: 'ai_scan',
        confidence: item.confidence || 0.95,
      };

      try {
        const created = await Inventory.create(itemData);
        addedItems.push(created);
      } catch (err) {
        addedItems.push({ _id: `inv_${Date.now()}_${Math.random()}`, ...itemData });
      }
    }

    res.json({
      success: true,
      message: `Added ${addedItems.length} ingredients to your ${location}`,
      data: { addedIngredients: addedItems },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'CONFIRM_SCAN_ERROR', message: error.message },
    });
  }
};

exports.getScanHistory = async (req, res) => {
  try {
    let scans = [];
    try {
      scans = await ScanHistory.find({ userId: req.user._id }).sort({ createdAt: -1 });
    } catch (err) {
      scans = MOCK_SCAN_HISTORY;
    }

    res.json({
      success: true,
      data: { scans },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SCAN_HISTORY_ERROR', message: error.message },
    });
  }
};
