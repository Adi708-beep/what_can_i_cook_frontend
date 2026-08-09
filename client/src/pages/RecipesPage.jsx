import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { RecipeFilters } from '../components/recipe/RecipeFilters';
import { Button } from '../components/common/Button';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { Utensils, Sparkles, Plus } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    cuisine: '',
    sortBy: 'bestMatch',
  });

  const { addToast } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, [filters]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/recipes');
      if (res.success && res.data.recipes) {
        let list = res.data.recipes;
        if (filters.search) {
          list = list.filter((r) =>
            r.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            r.ingredients.some((i) => i.name.toLowerCase().includes(filters.search.toLowerCase()))
          );
        }
        if (filters.cuisine) {
          list = list.filter((r) => r.cuisine?.toLowerCase() === filters.cuisine.toLowerCase());
        }
        if (filters.sortBy === 'expiring') {
          list = [...list].sort((a, b) => (b.expiryPriorityScore || 0) - (a.expiryPriorityScore || 0));
        } else if (filters.sortBy === 'fastest') {
          list = [...list].sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
        }
        setRecipes(list);
      }
    } catch (err) {} finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (recipeId) => {
    try {
      const res = await api.post(`/recipes/${recipeId}/favorite`);
      if (res.success) {
        setRecipes((prev) =>
          prev.map((r) => (r._id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r))
        );
        addToast(res.message || 'Favorites updated', 'success');
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white flex items-center gap-3">
            <Utensils className="w-8 h-8 text-[#2F7D4A]" /> AI Recipe Discovery
          </h1>
          <p className="text-sm text-stone-500">Personalized recipes generated strictly from your available kitchen inventory.</p>
        </div>

        <Button variant="primary" size="lg" onClick={() => navigate('/recipes/generate')} className="shadow-glow">
          <Sparkles className="w-5 h-5 mr-2 text-[#F3B562]" /> Generate Custom Recipe
        </Button>
      </div>

      <RecipeFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : recipes.length === 0 ? (
        <EmptyState
          title="No recipes found"
          description="Try broadening your filter criteria or generate a brand new recipe with AI."
          actionText="Generate Recipe"
          onAction={() => navigate('/recipes/generate')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} onToggleFavorite={handleToggleFavorite} />
          ))}
        </div>
      )}
    </div>
  );
}
