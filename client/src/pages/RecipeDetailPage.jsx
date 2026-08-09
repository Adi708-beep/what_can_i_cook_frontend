import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SubstitutionModal } from '../components/recipe/SubstitutionModal';
import { AdaptRecipeModal } from '../components/recipe/AdaptRecipeModal';
import { Clock, Flame, Dumbbell, Play, CheckCircle2, XCircle, Sparkles, RefreshCw, Users, ArrowLeft } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(2);
  const [selectedSubIngredient, setSelectedSubIngredient] = useState(null);
  const [isAdaptModalOpen, setIsAdaptModalOpen] = useState(false);
  const { addToast } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipeDetail();
  }, [id]);

  const fetchRecipeDetail = async () => {
    try {
      const res = await api.get(`/recipes/${id}`);
      if (res.success && res.data.recipe) {
        setRecipe(res.data.recipe);
        setServings(res.data.recipe.servings || 2);
      }
    } catch (err) {}
  };

  if (!recipe) {
    return <div className="p-8 text-center text-stone-400">Loading recipe details...</div>;
  }

  const scaleRatio = servings / (recipe.servings || 2);
  const availableCount = recipe.ingredients?.filter((i) => i.isAvailable !== false).length || 0;
  const totalCount = recipe.ingredients?.length || 1;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Recipes
      </Button>

      {/* Hero Banner Image */}
      <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200 dark:border-stone-800">
        <img
          src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000'}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="brand">{recipe.cuisine || 'International'}</Badge>
            <Badge variant="accent">{recipe.difficulty || 'Easy'}</Badge>
            {recipe.matchScore && <Badge variant="default">{recipe.matchScore}% AI Match</Badge>}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{recipe.title}</h1>
          <p className="text-stone-300 text-sm max-w-2xl mt-2 line-clamp-2">{recipe.description}</p>
        </div>
      </div>

      {/* Info Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white dark:bg-[#172019] rounded-2xl border border-stone-200 dark:border-stone-800 text-center">
        <div>
          <span className="text-xs text-stone-400 font-bold uppercase block">Prep + Cook</span>
          <span className="text-lg font-extrabold text-[#172019] dark:text-white flex items-center justify-center gap-1">
            <Clock className="w-4 h-4 text-[#2F7D4A]" /> {recipe.prepTime + recipe.cookTime} min
          </span>
        </div>
        <div>
          <span className="text-xs text-stone-400 font-bold uppercase block">Calories</span>
          <span className="text-lg font-extrabold text-[#172019] dark:text-white flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 text-amber-500" /> {Math.round((recipe.calories || 450) * scaleRatio)} kcal
          </span>
        </div>
        <div>
          <span className="text-xs text-stone-400 font-bold uppercase block">Protein</span>
          <span className="text-lg font-extrabold text-[#172019] dark:text-white flex items-center justify-center gap-1">
            <Dumbbell className="w-4 h-4 text-emerald-600" /> {Math.round((recipe.protein || 24) * scaleRatio)}g
          </span>
        </div>
        <div>
          <span className="text-xs text-stone-400 font-bold uppercase block">Availability</span>
          <span className="text-lg font-extrabold text-[#2F7D4A]">
            {availableCount} / {totalCount} Ready
          </span>
        </div>
      </div>

      {/* Main Grid: Ingredients & Preparation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Col: Ingredients & Serving Scaler */}
        <div className="space-y-6">
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-[#172019] dark:text-white">Ingredients</h3>

              {/* Dynamic Serving Scaler */}
              <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-xl text-xs font-bold">
                <Users className="w-3.5 h-3.5 text-stone-500" />
                <button onClick={() => setServings((prev) => Math.max(1, prev - 1))} className="hover:text-[#2F7D4A]">-</button>
                <span>{servings} Servings</span>
                <button onClick={() => setServings((prev) => prev + 1)} className="hover:text-[#2F7D4A]">+</button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {recipe.ingredients?.map((ing, idx) => (
                <div key={idx} className="flex items-start justify-between text-xs pb-2 border-b border-stone-100 dark:border-stone-800 last:border-0">
                  <div className="flex items-center gap-2">
                    {ing.isAvailable !== false ? (
                      <CheckCircle2 className="w-4 h-4 text-[#2F7D4A] shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#D9534F] shrink-0" />
                    )}
                    <span className={`font-semibold ${ing.isAvailable === false ? 'line-through text-stone-400' : 'text-[#172019] dark:text-white'}`}>
                      {ing.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-600 dark:text-stone-300">
                      {ing.amount}
                    </span>
                    {ing.isAvailable === false && (
                      <button
                        onClick={() => setSelectedSubIngredient(ing.name)}
                        className="text-[10px] font-bold text-[#2F7D4A] hover:underline bg-[#E1EFE5] dark:bg-[#1B4A2C] px-1.5 py-0.5 rounded"
                      >
                        Sub
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => setIsAdaptModalOpen(true)}>
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#F3B562]" /> Adapt Recipe with AI
            </Button>
          </Card>
        </div>

        {/* Right 2 Cols: Step-by-Step Instructions */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xl text-[#172019] dark:text-white">Preparation Steps</h3>
              <Button variant="primary" size="lg" onClick={() => navigate(`/cook/${recipe._id}`)} className="shadow-glow">
                <Play className="w-5 h-5 mr-2" /> Start Interactive Cooking Mode
              </Button>
            </div>

            <div className="space-y-4">
              {recipe.instructions?.map((step) => (
                <div key={step.step} className="flex gap-4 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200/60 dark:border-stone-800">
                  <div className="w-8 h-8 rounded-full bg-[#2F7D4A] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    {step.step}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-[#172019] dark:text-white">{step.title}</h4>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <SubstitutionModal
        isOpen={Boolean(selectedSubIngredient)}
        onClose={() => setSelectedSubIngredient(null)}
        ingredientName={selectedSubIngredient}
      />

      <AdaptRecipeModal
        isOpen={isAdaptModalOpen}
        onClose={() => setIsAdaptModalOpen(false)}
        recipeId={recipe._id}
        onAdaptComplete={(tag) => addToast(`Recipe adapted to: ${tag}`, 'success')}
      />
    </div>
  );
}
