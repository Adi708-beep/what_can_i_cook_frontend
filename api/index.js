const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../server/config/database');
const errorHandler = require('../server/middlewares/errorHandler');

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

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Connect Database (non-blocking)
connectDB().catch((err) => console.warn('[DB Error Catch]:', err.message));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'WHAT CAN I COOK? API',
    time: new Date(),
    environment: process.env.NODE_ENV || 'production',
  });
});

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

app.use(errorHandler);

module.exports = app;
