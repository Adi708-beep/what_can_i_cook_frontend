import React from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';

export function RecipeFilters({ filters, setFilters }) {
  const cuisines = ['All', 'Italian', 'Indian', 'Chinese', 'Japanese', 'Thai', 'Mexican', 'Mediterranean', 'American'];
  const diets = ['All', 'Vegetarian', 'Vegan', 'Keto', 'High Protein', 'Gluten Free'];

  return (
    <div className="bg-white dark:bg-[#172019] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-soft space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by ingredient, recipe title, or craving..."
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 rounded-xl text-sm border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
          />
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-stone-400" />
          <select
            value={filters.sortBy || 'bestMatch'}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="px-3 py-2.5 bg-stone-50 dark:bg-stone-900 rounded-xl text-sm border border-stone-200 dark:border-stone-800 text-[#172019] dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
          >
            <option value="bestMatch">Sort: Best Match</option>
            <option value="expiring">Uses Expiring Soon</option>
            <option value="fastest">Fastest Cooking Time</option>
            <option value="protein">Highest Protein</option>
          </select>
        </div>
      </div>

      {/* Quick Tag Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
        <span className="font-bold text-stone-400 mr-1">Cuisine:</span>
        {cuisines.map((c) => (
          <button
            key={c}
            onClick={() => setFilters({ ...filters, cuisine: c === 'All' ? '' : c })}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              (filters.cuisine === c || (!filters.cuisine && c === 'All'))
                ? 'bg-[#2F7D4A] text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
