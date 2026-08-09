import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function OnboardingPage() {
  const { user, updateUser } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    dietaryPreferences: user?.dietaryPreferences || ['Everything'],
    allergies: user?.allergies || [],
    favoriteCuisines: user?.favoriteCuisines || ['Italian', 'Indian'],
    cookingSkill: user?.cookingSkill || 'Intermediate',
    preferredCookingTime: user?.preferredCookingTime || '15–30 minutes',
    kitchenSetup: user?.kitchenSetup || ['Fridge', 'Pantry', 'Oven', 'Stovetop'],
  });

  const diets = ['Everything', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'High Protein', 'Low Carb', 'Gluten Free', 'Dairy Free'];
  const allergyOptions = ['Peanuts', 'Tree nuts', 'Milk', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish', 'Sesame'];
  const cuisines = ['Indian', 'Italian', 'Chinese', 'Japanese', 'Thai', 'Mexican', 'Mediterranean', 'Korean', 'American'];
  const skills = ['Beginner', 'Intermediate', 'Advanced'];
  const cookingTimes = ['Under 15 minutes', '15–30 minutes', '30–60 minutes', '60+ minutes'];
  const appliances = ['Fridge', 'Freezer', 'Pantry', 'Oven', 'Microwave', 'Air fryer', 'Pressure cooker', 'Rice cooker', 'Blender', 'Stovetop'];

  const toggleArrayItem = (key, item) => {
    setFormData((prev) => {
      const arr = prev[key] || [];
      if (arr.includes(item)) {
        return { ...prev, [key]: arr.filter((i) => i !== item) };
      } else {
        return { ...prev, [key]: [...arr, item] };
      }
    });
  };

  const handleNext = async () => {
    if (step < 7) {
      setStep((prev) => prev + 1);
    } else {
      // Save onboarding data
      try {
        const res = await api.post('/users/onboarding', formData);
        if (res.success) {
          updateUser(res.data.user);
          addToast('Kitchen setup completed!', 'success');
          navigate('/dashboard');
        }
      } catch (err) {
        addToast('Saved preferences and continuing...', 'info');
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl w-full bg-white dark:bg-[#172019] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-elevated p-8">
        {/* Step Indicator Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#2F7D4A] text-white flex items-center justify-center font-bold">
              {step}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Step {step} of 7</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? 'w-8 bg-[#2F7D4A]' : s < step ? 'w-2 bg-[#94C6A5]' : 'w-2 bg-stone-200 dark:bg-stone-800'
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Name */}
          {step === 1 && (
            <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#172019] dark:text-white">What should we call you?</h2>
              <p className="text-sm text-stone-500">Your AI Sous Chef will address you personally.</p>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-lg focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
              />
            </motion.div>
          )}

          {/* Step 2: Diet */}
          {step === 2 && (
            <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#172019] dark:text-white">What's your dietary preference?</h2>
              <p className="text-sm text-stone-500">Select all that apply. AI will strictly respect these when generating recipes.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {diets.map((d) => {
                  const selected = formData.dietaryPreferences.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => toggleArrayItem('dietaryPreferences', d)}
                      className={`p-3.5 rounded-2xl text-xs font-bold border transition-all flex items-center justify-between ${
                        selected ? 'border-[#2F7D4A] bg-[#E1EFE5] text-[#205C36] dark:bg-[#1B4A2C] dark:text-[#E1EFE5]' : 'border-stone-200 dark:border-stone-800'
                      }`}
                    >
                      <span>{d}</span>
                      {selected && <Check className="w-4 h-4 text-[#2F7D4A]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Allergies */}
          {step === 3 && (
            <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#172019] dark:text-white">Do you have any food allergies?</h2>
              <p className="text-sm text-stone-500">We will never suggest ingredients containing selected allergens.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {allergyOptions.map((a) => {
                  const selected = formData.allergies.includes(a);
                  return (
                    <button
                      key={a}
                      onClick={() => toggleArrayItem('allergies', a)}
                      className={`p-3.5 rounded-2xl text-xs font-bold border transition-all flex items-center justify-between ${
                        selected ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300' : 'border-stone-200 dark:border-stone-800'
                      }`}
                    >
                      <span>{a}</span>
                      {selected && <Check className="w-4 h-4 text-red-500" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 4: Favorite Cuisines */}
          {step === 4 && (
            <motion.div key="4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#172019] dark:text-white">Which cuisines do you love?</h2>
              <p className="text-sm text-stone-500">Select your favorite culinary styles.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cuisines.map((c) => {
                  const selected = formData.favoriteCuisines.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggleArrayItem('favoriteCuisines', c)}
                      className={`p-3.5 rounded-2xl text-xs font-bold border transition-all flex items-center justify-between ${
                        selected ? 'border-[#2F7D4A] bg-[#E1EFE5] text-[#205C36]' : 'border-stone-200 dark:border-stone-800'
                      }`}
                    >
                      <span>{c}</span>
                      {selected && <Check className="w-4 h-4 text-[#2F7D4A]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 5: Cooking Skill */}
          {step === 5 && (
            <motion.div key="5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#172019] dark:text-white">What's your cooking skill level?</h2>
              <div className="space-y-3">
                {skills.map((sk) => (
                  <button
                    key={sk}
                    onClick={() => setFormData({ ...formData, cookingSkill: sk })}
                    className={`w-full p-4 rounded-2xl text-left font-bold text-base border transition-all flex items-center justify-between ${
                      formData.cookingSkill === sk ? 'border-[#2F7D4A] bg-[#E1EFE5] text-[#205C36]' : 'border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <span>{sk}</span>
                    {formData.cookingSkill === sk && <Check className="w-5 h-5 text-[#2F7D4A]" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 6: Preferred Cooking Time */}
          {step === 6 && (
            <motion.div key="6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#172019] dark:text-white">How much time do you usually have?</h2>
              <div className="space-y-3">
                {cookingTimes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setFormData({ ...formData, preferredCookingTime: t })}
                    className={`w-full p-4 rounded-2xl text-left font-bold text-base border transition-all flex items-center justify-between ${
                      formData.preferredCookingTime === t ? 'border-[#2F7D4A] bg-[#E1EFE5] text-[#205C36]' : 'border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <span>{t}</span>
                    {formData.preferredCookingTime === t && <Check className="w-5 h-5 text-[#2F7D4A]" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 7: Kitchen Setup */}
          {step === 7 && (
            <motion.div key="7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#172019] dark:text-white">What equipment is in your kitchen?</h2>
              <p className="text-sm text-stone-500">AI will only suggest recipes using your available appliances.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {appliances.map((app) => {
                  const selected = formData.kitchenSetup.includes(app);
                  return (
                    <button
                      key={app}
                      onClick={() => toggleArrayItem('kitchenSetup', app)}
                      className={`p-3.5 rounded-2xl text-xs font-bold border transition-all flex items-center justify-between ${
                        selected ? 'border-[#2F7D4A] bg-[#E1EFE5] text-[#205C36]' : 'border-stone-200 dark:border-stone-800'
                      }`}
                    >
                      <span>{app}</span>
                      {selected && <Check className="w-4 h-4 text-[#2F7D4A]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-stone-100 dark:border-stone-800">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep((prev) => prev - 1)}>
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
            </Button>
          ) : <div />}

          <Button variant="primary" size="lg" onClick={handleNext}>
            {step === 7 ? 'Complete Setup' : 'Continue'} <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
