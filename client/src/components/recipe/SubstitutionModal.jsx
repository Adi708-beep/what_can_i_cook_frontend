import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Sparkles, Check, RefreshCw } from 'lucide-react';
import api from '../../lib/api';

export function SubstitutionModal({ isOpen, onClose, ingredientName }) {
  const [substitutions, setSubstitutions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && ingredientName) {
      fetchSubstitutions();
    }
  }, [isOpen, ingredientName]);

  const fetchSubstitutions = async () => {
    setLoading(true);
    try {
      const res = await api.post('/ai/substitute', { ingredient: ingredientName });
      if (res.success && res.data) {
        setSubstitutions(res.data.substitutions || []);
      }
    } catch (err) {
      setSubstitutions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Smart Substitutions for "${ingredientName}"`}>
      <div className="space-y-4">
        <p className="text-xs text-stone-500">
          AI analyzed your pantry items, flavor profile, and texture to suggest ideal culinary alternatives.
        </p>

        {loading ? (
          <div className="py-8 text-center flex flex-col items-center gap-2 text-stone-400">
            <RefreshCw className="w-6 h-6 animate-spin text-[#2F7D4A]" />
            <span className="text-xs font-semibold">Analyzing culinary pairings...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {substitutions.map((sub, idx) => (
              <div key={idx} className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F3B562]" />
                    <h4 className="font-bold text-base text-[#172019] dark:text-white">
                      {sub.replacement}
                    </h4>
                  </div>
                  <Badge variant="default">{sub.compatibilityScore}% Compatibility</Badge>
                </div>

                <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
                  <p><strong>Suggested Ratio:</strong> {sub.ratio}</p>
                  <p><strong>Texture & Taste Note:</strong> {sub.textureNote}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button variant="primary" onClick={onClose}>
            Got it, thanks!
          </Button>
        </div>
      </div>
    </Modal>
  );
}
