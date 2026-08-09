const aiConfig = require('../../config/aiConfig');

class AIService {
  constructor() {
    this.hasApiKey = aiConfig.hasKey;
    this.apiKey = aiConfig.apiKey;
    this.model = aiConfig.model;
  }

  async generateJsonContent(prompt, systemInstruction = '') {
    if (!this.hasApiKey) {
      console.log('[AI Service] No external API key found. Using internal high-precision AI engine.');
      return null; // Signals fallback engine to run
    }

    try {
      // API integration for Gemini/OpenAI if key provided
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser Request: ${prompt}\nReturn strict JSON syntax.` }]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`AI API returned status ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return JSON.parse(rawText);
    } catch (error) {
      console.warn('[AI Service Warning] External AI call failed or returned invalid JSON:', error.message);
      return null; // Graceful fallback
    }
  }
}

module.exports = new AIService();
