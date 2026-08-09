import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Sparkles, Check } from 'lucide-react';
import api from '../../lib/api';

export function AdaptRecipeModal({ isOpen, onClose, recipeId, onAdaptComplete }) {
  const [selectedTag, setSelectedTag] = useState('Make vegetarian');
  const [loading, setLoading] = useState(false);

  const adaptationOptions = [
    'Make vegetarian',
    'Make vegan',
    'Make gluten-free',
    'Make dairy-free',
    'Make higher protein',
    'Reduce calories',
    'Make spicier',
    'Make it faster',
    'Use what I have in fridge',
  ];

  const handleAdapt = async () => {
    setLoading(true);
    try {
      const res = await api.post('/ai/adapt-recipe', { recipeId, adaptationType: selectedTag });
      if (res.success) {
        onAdaptComplete && onAdaptComplete(selectedTag);
        onClose();
      }
    } catch (err) {
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adapt Recipe with AI">
      <div className="space-y-4">
        <p className="text-xs text-stone-500">
          Select how you want AI to customize this recipe's ingredients and cooking instructions:
        </p>

        <div className="grid grid-cols-2 gap-2">
          {adaptationOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedTag(opt)}
              className={`p-3 rounded-xl text-xs font-bold border text-left transition-all flex items-center justify-between ${
                selectedTag === opt
                  ? 'border-[#2F7D4A] bg-[#E1EFE5] text-[#205C36] dark:bg-[#1B4A2C] dark:text-[#E1EFE5]'
                  : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              <span>{opt}</span>
              {selectedTag === opt && <Check className="w-4 h-4 text-[#2F7D4A]" />}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" isLoading={loading} onClick={handleAdapt}>
            <Sparkles className="w-4 h-4 mr-1.5" />
            Regenerate Recipe
          </Button>
        </div>
      </div>
    </Modal>
  );
}
