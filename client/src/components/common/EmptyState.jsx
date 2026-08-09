import React from 'react';
import { Button } from './Button';
import { ChefHat } from 'lucide-react';

export function EmptyState({
  title = "Your kitchen is waiting",
  description = "Scan your fridge or add ingredients to discover what delicious meals you can cook right now.",
  actionText = "Scan Kitchen",
  onAction,
  icon: Icon = ChefHat,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-[#172019] rounded-3xl border border-dashed border-stone-200 dark:border-stone-800 my-4">
      <div className="w-16 h-16 rounded-2xl bg-[#E1EFE5] dark:bg-[#1B4A2C] flex items-center justify-center text-[#2F7D4A] dark:text-[#E1EFE5] mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-[#172019] dark:text-white mb-2">{title}</h3>
      <p className="text-stone-500 dark:text-stone-400 max-w-md text-sm mb-6">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
}
