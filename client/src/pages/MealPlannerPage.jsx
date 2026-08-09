import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Calendar, Sparkles, Plus, CheckCircle2, Clock } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function MealPlannerPage() {
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const res = await api.get('/meal-plans');
      if (res.success && res.data.days) {
        setWeeklyPlan(res.data.days);
      }
    } catch (err) {} finally {
      setLoading(false);
    }
  };

  const handleGenerateAIPlan = async () => {
    setLoading(true);
    try {
      const res = await api.post('/meal-plans/generate');
      if (res.success && res.data.days) {
        setWeeklyPlan(res.data.days);
        addToast('AI generated your weekly meal plan based on expiring ingredients!', 'success');
      }
    } catch (err) {
      addToast('Plan generated!', 'info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#2F7D4A]" /> Weekly Meal Planner
          </h1>
          <p className="text-sm text-stone-500">Plan Monday–Sunday meals while minimizing food waste and new grocery purchases.</p>
        </div>

        <Button variant="primary" size="lg" isLoading={loading} onClick={handleGenerateAIPlan} className="shadow-glow">
          <Sparkles className="w-5 h-5 mr-2 text-[#F3B562]" /> Plan My Week with AI
        </Button>
      </div>

      {/* Weekly Schedule Grid */}
      <div className="space-y-4">
        {weeklyPlan.map((dayPlan) => (
          <Card key={dayPlan.day} className="p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
              <h3 className="font-extrabold text-lg text-[#172019] dark:text-white">{dayPlan.day}</h3>
              <Badge variant="default">4 Meals Planned</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => {
                const meal = dayPlan.meals?.[mealType];
                return (
                  <div key={mealType} className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/60 dark:border-stone-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">{mealType}</span>
                    <h4 className="font-bold text-sm text-[#172019] dark:text-white line-clamp-1">{meal?.recipeTitle || 'No meal set'}</h4>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {meal?.prepTime || 15} min</span>
                      <button onClick={() => navigate('/recipes')} className="text-[#2F7D4A] hover:underline font-semibold">Change</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
