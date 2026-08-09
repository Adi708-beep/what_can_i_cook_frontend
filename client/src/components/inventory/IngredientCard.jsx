import React from 'react';
import { Card } from '../common/Card';
import { ExpiryBadge } from './ExpiryBadge';
import { Trash2, Edit3, Utensils, Calendar, MapPin } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export function IngredientCard({ item, onEdit, onDelete, onUseInRecipe }) {
  return (
    <Card className="flex flex-col justify-between hover:border-[#2F7D4A]/50 transition-all">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-bold text-base text-[#172019] dark:text-white capitalize">{item.name}</h4>
          <ExpiryBadge freshness={item.freshness} />
        </div>

        <div className="space-y-1.5 text-xs text-stone-500 dark:text-stone-400 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Quantity: {item.quantity} {item.unit}
            </span>
            <span>•</span>
            <span className="capitalize text-emerald-700 dark:text-emerald-400 font-medium">
              {item.category}
            </span>
          </div>

          {item.expiryDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Best before: {formatDate(item.expiryDate)}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span className="capitalize">Location: {item.location}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
        <button
          onClick={() => onUseInRecipe && onUseInRecipe(item)}
          className="flex items-center gap-1 text-xs font-bold text-[#2F7D4A] hover:text-[#205C36] dark:text-[#5FA67A] transition-colors"
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Cook with this</span>
        </button>

        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(item._id)}
              className="p-1.5 text-stone-400 hover:text-[#D9534F] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
