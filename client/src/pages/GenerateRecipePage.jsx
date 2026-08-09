import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Sparkles, Utensils, ArrowRight } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function GenerateRecipePage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const presets = [
    'Something quick & easy',
    'High protein dinner',
    'Indian comfort food',
    'Spicy pasta',
    'Use my fresh spinach',
    '15 minute breakfast',
  ];

  const handleGenerate = async (q = query) => {
    if (!q.trim() && !query.trim()) return;
    setLoading(true);
    try {
      const res = await api.post('/ai/generate-recipe', { query: q || query });
      if (res.success && res.data.recipes) {
        addToast('AI generated personalized recipe options!', 'success');
        navigate('/recipes');
      }
    } catch (err) {
      addToast(err.message || 'Generation error.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-[#E1EFE5] text-[#2F7D4A] flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-[#F3B562]" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white">What do you want to eat?</h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          Tell AI your craving or select a prompt below. AI will combine your request with your current fridge inventory.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300">Custom Craving Prompt</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. High protein dinner using my spinach"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
            />
            <Button variant="primary" size="lg" isLoading={loading} onClick={() => handleGenerate()}>
              Generate <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase text-stone-400">Quick Inspiration Presets</label>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setQuery(p);
                  handleGenerate(p);
                }}
                className="px-3.5 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-[#E1EFE5] hover:text-[#205C36] dark:hover:bg-[#1B4A2C] rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 transition-all"
              >
                ✨ {p}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
