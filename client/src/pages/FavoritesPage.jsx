import React, { useState, useEffect } from 'react';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { EmptyState } from '../components/common/EmptyState';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await api.get('/recipes');
      if (res.success && res.data.recipes) {
        setFavorites(res.data.recipes.filter(r => r.isFavorite));
      }
    } catch (err) {} finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-500 fill-current" /> Favorite Recipes
        </h1>
        <p className="text-sm text-stone-500">All saved recipes you love and cook regularly.</p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorite recipes yet"
          description="Click the heart icon on any recipe card to save it here for quick access."
          actionText="Browse Recipes"
          onAction={() => navigate('/recipes')}
          icon={Heart}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
