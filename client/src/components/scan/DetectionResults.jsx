import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Check, Trash2, Edit2, AlertCircle, Plus } from 'lucide-react';

export function DetectionResults({ detectedItems = [], onConfirm, onRetake }) {
  const [items, setItems] = useState(detectedItems);

  const handleRemove = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index, delta) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, estimatedQuantity: Math.max(1, item.estimatedQuantity + delta) } : item
      )
    );
  };

  const getConfidenceBadge = (confidence = 0.9) => {
    const pct = Math.round(confidence * 100);
    if (pct >= 90) {
      return <Badge variant="default">{pct}% High Confidence</Badge>;
    } else if (pct >= 75) {
      return <Badge variant="warning">{pct}% Medium Confidence</Badge>;
    } else {
      return <Badge variant="accent">{pct}% Low - Verify</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-extrabold text-[#172019] dark:text-white">
            AI Detected {items.length} Ingredients
          </h3>
          <p className="text-sm text-stone-500">Verify detected items before adding them to MongoDB inventory.</p>
        </div>
        <Button variant="outline" size="sm" onClick={onRetake}>
          Retake Photo
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <Card key={idx} hoverEffect={false} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E1EFE5] dark:bg-[#1B4A2C] text-[#2F7D4A] flex items-center justify-center font-bold text-lg">
                {item.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[#172019] dark:text-white text-base">{item.name}</h4>
                  {getConfidenceBadge(item.confidence)}
                </div>
                <p className="text-xs text-stone-500 capitalize">
                  Category: {item.category} • Approx {item.expiryDays || 4} days fresh
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-xl">
                <button
                  onClick={() => handleUpdateQuantity(idx, -1)}
                  className="text-stone-500 hover:text-stone-900 font-bold px-1"
                >
                  -
                </button>
                <span className="font-bold text-sm text-[#172019] dark:text-white min-w-[30px] text-center">
                  {item.estimatedQuantity} {item.unit}
                </span>
                <button
                  onClick={() => handleUpdateQuantity(idx, 1)}
                  className="text-stone-500 hover:text-stone-900 font-bold px-1"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(idx)}
                className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 text-[#E5A72B]" />
        <div>
          <strong className="block font-bold mb-0.5">Food Safety Disclaimer</strong>
          AI estimate only. Always check food packaging, smell, and storage conditions before consuming.
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => onConfirm(items)}>
          <Check className="w-5 h-5 mr-2" />
          Confirm & Save {items.length} Items to Fridge
        </Button>
      </div>
    </div>
  );
}
