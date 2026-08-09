import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Clock, Flame, Dumbbell, Heart, Sparkles, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function RecipeCard({ recipe, onToggleFavorite }) {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col justify-between overflow-hidden p-0 group cursor-pointer" onClick={() => navigate(`/recipes/${recipe._id}`)}>
      {/* Hero Food Image */}
      <div className="relative h-48 w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
        <img
          src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Match Score Badge */}
        {recipe.matchScore && (
          <div className="absolute top-3 left-3 bg-[#2F7D4A]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#F3B562]" />
            <span>{recipe.matchScore}% Match</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite(recipe._id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            recipe.isFavorite ? 'bg-red-500 text-white shadow-lg scale-110' : 'bg-stone-900/40 text-white hover:bg-stone-900/60'
          }`}
        >
          <Heart className={`w-4 h-4 ${recipe.isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Expiry Priority Warning */}
          {recipe.expiryPriorityScore > 80 && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#E5A72B] mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Uses ingredients expiring soon!</span>
            </div>
          )}

          <h3 className="font-bold text-lg text-[#172019] dark:text-white line-clamp-1 group-hover:text-[#2F7D4A] transition-colors">
            {recipe.title}
          </h3>
          <p className="text-xs text-stone-500 line-clamp-2 mt-1">{recipe.description}</p>
        </div>

        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#2F7D4A]" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{recipe.calories || 450} kcal</span>
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
            <span>{recipe.protein || 24}g protein</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
