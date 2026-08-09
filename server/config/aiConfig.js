require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const key = process.env.AI_API_KEY || null;

module.exports = {
  apiKey: key,
  model: process.env.AI_MODEL || 'gemini-1.5-flash',
  hasKey: Boolean(key && key.trim() !== ''),
  maxTokens: 2048,
  temperature: 0.7,
};
