const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('../server/routes/authRoutes');
const userRoutes = require('../server/routes/userRoutes');
const inventoryRoutes = require('../server/routes/inventoryRoutes');
const scanRoutes = require('../server/routes/scanRoutes');
const aiRoutes = require('../server/routes/aiRoutes');
const recipeRoutes = require('../server/routes/recipeRoutes');
const mealPlanRoutes = require('../server/routes/mealPlanRoutes');
const shoppingListRoutes = require('../server/routes/shoppingListRoutes');
const notificationRoutes = require('../server/routes/notificationRoutes');
const analyticsRoutes = require('../server/routes/analyticsRoutes');

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'WHAT CAN I COOK? API',
    time: new Date(),
    environment: 'production',
  });
});

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/scans', scanRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/shopping-list', shoppingListRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: err.message || 'Internal server error',
    },
  });
});

module.exports = app;
