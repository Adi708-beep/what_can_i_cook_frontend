import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Camera, Plus, Utensils, AlertTriangle, Sparkles, Clock, Flame, ShieldAlert, ArrowRight } from 'lucide-react';
import api from '../lib/api';

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [expiringItems, setExpiringItems] = useState([]);
  const [recommendedRecipe, setRecommendedRecipe] = useState(null);
  const [wasteScore, setWasteScore] = useState(87);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const invRes = await api.get('/inventory');
      if (invRes.success && invRes.data.inventory) {
        // Get items expiring soon (urgencyScore >= 40)
        setExpiringItems(invRes.data.inventory.filter((i) => i.urgencyScore >= 40).slice(0, 4));
      }

      const recRes = await api.get('/recipes');
      if (recRes.success && recRes.data.recipes) {
        setRecommendedRecipe(recRes.data.recipes[1] || recRes.data.recipes[0]);
      }
    } catch (err) {
      // Graceful fallback values
      setExpiringItems([
        { _id: '1', name: 'Whole Milk', freshness: 'Expires tomorrow', location: 'fridge' },
        { _id: '2', name: 'Fresh Spinach', freshness: 'Within 3 days', location: 'fridge' },
        { _id: '3', name: 'Chicken Breast', freshness: 'Within 3 days', location: 'fridge' },
      ]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172019] dark:text-white">
          Good afternoon, {user?.name?.split(' ')[0] || 'Chef'} 👋
        </h1>
        <p className="text-[#6B746D] dark:text-stone-400 text-sm mt-1">
          Let's make something delicious with what you already have in your kitchen.
        </p>
      </div>

      {/* Primary Action Card Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#205C36] via-[#2F7D4A] to-[#1B4A2C] text-white p-8 shadow-xl">
        <div className="relative z-10 max-w-xl space-y-4">
          <Badge variant="accent" className="gap-1 font-bold">
            <Sparkles className="w-3.5 h-3.5" /> AI Kitchen Active
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold">What can you cook today?</h2>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Scan your fridge contents or browse personalized recipes created specifically from your available ingredients.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="accent" size="lg" onClick={() => navigate('/scan')} className="font-bold shadow-md">
              <Camera className="w-5 h-5 mr-2" />
              Scan My Kitchen
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/fridge?action=add')} className="text-white border-white/30 hover:bg-white/10">
              <Plus className="w-5 h-5 mr-2" />
              Add Ingredients
            </Button>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none hidden md:block">
          <Utensils className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Grid Section: Expiring Soon & AI Recommended Recipe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: AI Recommendation & Waste Score */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Recommended Recipe */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-extrabold text-[#172019] dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#2F7D4A]" /> AI Top Recommendation
              </h3>
              <button onClick={() => navigate('/recipes')} className="text-xs font-bold text-[#2F7D4A] hover:underline flex items-center gap-1">
                View all recipes <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recommendedRecipe ? (
              <Card className="flex flex-col sm:flex-row gap-6 p-6 items-center">
                <img
                  src={recommendedRecipe.image || 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=600'}
                  alt={recommendedRecipe.title}
                  className="w-full sm:w-48 h-44 object-cover rounded-2xl shrink-0"
                />

                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="brand">{recommendedRecipe.matchScore || 98}% Match</Badge>
                    <Badge variant="warning">Uses 2 Expiring Items</Badge>
                  </div>

                  <h4 className="text-xl font-bold text-[#172019] dark:text-white">{recommendedRecipe.title}</h4>
                  <p className="text-xs text-stone-500 line-clamp-2">{recommendedRecipe.description}</p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-stone-600 dark:text-stone-300">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#2F7D4A]" /> {recommendedRecipe.prepTime + recommendedRecipe.cookTime} min</span>
                    <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-amber-500" /> {recommendedRecipe.calories || 380} kcal</span>
                    <span>Easy</span>
                  </div>

                  <Button variant="primary" size="md" onClick={() => navigate(`/cook/${recommendedRecipe._id}`)}>
                    <Utensils className="w-4 h-4 mr-2" />
                    Cook This Now
                  </Button>
                </div>
              </Card>
            ) : null}
          </div>

          {/* Food Waste Reduction Progress */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-[#172019] dark:text-white">Food Waste Score</h3>
              <span className="text-xl font-extrabold text-[#2F7D4A]">{wasteScore}% Excellent</span>
            </div>
            <p className="text-xs text-stone-500 mb-4">You've saved approximately $145.50 in food waste this month!</p>
            <div className="w-full h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#2F7D4A] rounded-full" style={{ width: `${wasteScore}%` }} />
            </div>
          </Card>
        </div>

        {/* Right Col: Expiring Soon List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-extrabold text-[#172019] dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#E5A72B]" /> Expiring Soon
            </h3>
            <button onClick={() => navigate('/fridge')} className="text-xs font-bold text-[#2F7D4A] hover:underline">
              View Kitchen
            </button>
          </div>

          <div className="space-y-3">
            {expiringItems.length === 0 ? (
              <div className="p-4 text-center text-xs text-stone-400 bg-white dark:bg-[#172019] rounded-2xl border border-stone-200 dark:border-stone-800">
                No items expiring soon! Excellent job.
              </div>
            ) : (
              expiringItems.map((item) => (
                <Card key={item._id} hoverEffect={false} className="p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-sm text-[#172019] dark:text-white block capitalize">{item.name}</span>
                    <span className="text-stone-400">Stored in {item.location}</span>
                  </div>
                  <Badge variant="warning">{item.freshness || 'Expires soon'}</Badge>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
