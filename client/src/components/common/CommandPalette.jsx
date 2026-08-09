import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Camera, Plus, Utensils, Refrigerator, Calendar, ShoppingBag, Sparkles, Settings, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCommandPalette } from '../../context/CommandPaletteContext';

export function CommandPalette() {
  const { isOpen, closePalette } = useCommandPalette();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const actions = [
    { id: 'scan', label: 'Scan Kitchen with AI Vision', icon: Camera, path: '/scan' },
    { id: 'add', label: 'Add Ingredient Manually', icon: Plus, path: '/fridge?action=add' },
    { id: 'recipes', label: 'Browse AI Recipe Recommendations', icon: Utensils, path: '/recipes' },
    { id: 'fridge', label: 'Open My Fridge Inventory', icon: Refrigerator, path: '/fridge' },
    { id: 'planner', label: 'Open Weekly Meal Planner', icon: Calendar, path: '/meal-planner' },
    { id: 'shopping', label: 'Open Shopping List', icon: ShoppingBag, path: '/shopping-list' },
    { id: 'settings', label: 'Open App Settings & Preferences', icon: Settings, path: '/settings' },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path) => {
    navigate(path);
    closePalette();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePalette}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl bg-white dark:bg-[#172019] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 z-10 overflow-hidden"
          >
            <div className="flex items-center px-4 py-3.5 border-b border-stone-100 dark:border-stone-800">
              <Search className="w-5 h-5 text-stone-400 mr-3" />
              <input
                type="text"
                placeholder="Type a command or search... (Press Esc to close)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-[#172019] dark:text-white focus:outline-none text-base placeholder-stone-400"
              />
              <button onClick={closePalette} className="text-stone-400 hover:text-stone-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-stone-400">No matching commands found</div>
              ) : (
                filtered.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleSelect(action.path)}
                      className="w-full flex items-center px-3.5 py-3 rounded-2xl text-left hover:bg-[#E1EFE5] dark:hover:bg-[#1B4A2C] transition-colors group"
                    >
                      <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 group-hover:bg-[#2F7D4A] group-hover:text-white transition-colors mr-3">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-[#172019] dark:text-white group-hover:text-[#205C36] dark:group-hover:text-[#E1EFE5]">
                        {action.label}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>Navigation Shortcut</span>
              <span className="font-mono bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded text-stone-600 dark:text-stone-300">⌘K / Ctrl+K</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
