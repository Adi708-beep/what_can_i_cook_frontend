const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/what-can-i-cook';
    
    // Set Mongoose connection options
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB at ${process.env.MONGODB_URI}: ${error.message}`);
    console.warn(`[Database Note] Server will continue in Fallback Memory Mode for local development testing.`);
    return false;
  }
};

module.exports = connectDB;
