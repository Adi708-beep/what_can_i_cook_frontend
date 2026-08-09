const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return true;
  }

  const connStr = process.env.MONGODB_URI;
  if (!connStr || connStr.includes('localhost')) {
    console.warn('[Database Note] Serverless deployment fallback mode.');
    return false;
  }

  try {
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`[Database Warning] MongoDB connection error: ${error.message}`);
    return false;
  }
};

module.exports = connectDB;
