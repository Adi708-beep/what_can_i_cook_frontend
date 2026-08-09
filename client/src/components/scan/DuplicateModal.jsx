import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AlertCircle } from 'lucide-react';

export function DuplicateModal({ isOpen, onClose, duplicateInfo, onMerge, onCreateSeparate }) {
  if (!duplicateInfo) return null;

  const { newItem, existingItem } = duplicateInfo;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Duplicate Ingredient Detected">
      <div className="space-y-4">
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#2F7D4A] shrink-0 mt-0.5" />
          <p className="text-sm text-[#172019] dark:text-stone-200">
            We found <strong>{existingItem?.name}</strong> already stored in your kitchen inventory!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs p-3 bg-stone-100 dark:bg-stone-800 rounded-xl">
          <div>
            <span className="text-stone-400 block font-bold">Existing Item:</span>
            <span className="font-semibold text-stone-700 dark:text-stone-200">{existingItem?.quantity} {existingItem?.unit}</span>
          </div>
          <div>
            <span className="text-stone-400 block font-bold">New Scan Detected:</span>
            <span className="font-semibold text-[#2F7D4A]">{newItem?.estimatedQuantity} {newItem?.unit}</span>
          </div>
        </div>

        <p className="text-xs text-stone-500">Would you like to merge quantities or store as a separate item?</p>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button variant="primary" className="flex-1" onClick={onMerge}>
            Merge Quantities
          </Button>
          <Button variant="outline" className="flex-1" onClick={onCreateSeparate}>
            Create Separate Item
          </Button>
        </div>
      </div>
    </Modal>
  );
}
