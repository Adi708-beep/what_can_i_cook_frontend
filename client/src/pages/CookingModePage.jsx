import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TimerWidget } from '../components/recipe/TimerWidget';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { CheckCircle2, ChevronLeft, ChevronRight, X, Sparkles, Star, Mic, Send, Bot, Check, RotateCcw } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function CookingModePage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [rating, setRating] = useState(5);
  const [wouldCookAgain, setWouldCookAgain] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isMicActive, setIsMicActive] = useState(false);

  const { addToast } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  const fetchRecipe = async () => {
    try {
      const res = await api.get(`/recipes/${recipeId}`);
      if (res.success && res.data.recipe) {
        setRecipe(res.data.recipe);
        setChatMessages([
          { sender: 'ai', text: `Welcome to Cooking Mode for ${res.data.recipe.title}! Ask me any questions while you cook.` }
        ]);
      }
    } catch (err) {}
  };

  const handleNextStep = () => {
    if (!recipe?.instructions) return;
    if (currentStepIndex < recipe.instructions.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSendChat = async (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    try {
      const res = await api.post('/ai/chat', {
        message: userText,
        recipeTitle: recipe?.title,
        currentStep: currentStepIndex + 1,
      });
      if (res.success && res.data) {
        setChatMessages((prev) => [...prev, { sender: 'ai', text: res.data.reply }]);
      }
    } catch (err) {}
  };

  const handleFinishCooking = async () => {
    try {
      const used = recipe?.ingredients?.map((i) => i.name) || [];
      await api.post(`/recipes/${recipeId}/complete`, {
        rating,
        wouldCookAgain,
        usedIngredients: used,
      });
      addToast('Recipe completed! Inventory updated.', 'success');
      navigate('/dashboard');
    } catch (err) {
      navigate('/dashboard');
    }
  };

  if (!recipe) return <div className="p-8 text-center text-stone-400">Loading cooking session...</div>;

  const steps = recipe.instructions || [];
  const currentStep = steps[currentStepIndex] || {};
  const progressPct = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-[#FAFAF5] dark:bg-[#0F1411] overflow-y-auto flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="px-6 py-4 bg-white dark:bg-[#172019] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800">
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-extrabold text-lg text-[#172019] dark:text-white">{recipe.title}</h2>
            <span className="text-xs text-[#2F7D4A] font-semibold">Distraction-Free Cooking Mode</span>
          </div>
        </div>

        {/* Voice Support Simulator */}
        <button
          onClick={() => setIsMicActive(!isMicActive)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            isMicActive ? 'bg-red-500 text-white animate-pulse' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>{isMicActive ? 'Voice Control Active' : 'Voice Commands'}</span>
        </button>
      </header>

      {/* Main Screen Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {!isCompleted ? (
          <>
            {/* Progress Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-stone-500">
                <span>Step {currentStepIndex + 1} of {steps.length}</span>
                <span>{progressPct}% Completed</span>
              </div>
              <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#2F7D4A] rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            {/* Active Step Card */}
            <Card className="p-8 space-y-6 border-2 border-[#2F7D4A]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2F7D4A] text-white flex items-center justify-center font-extrabold text-lg">
                  {currentStep.step || currentStepIndex + 1}
                </div>
                <h3 className="text-2xl font-extrabold text-[#172019] dark:text-white">
                  {currentStep.title || `Step ${currentStepIndex + 1}`}
                </h3>
              </div>

              <p className="text-stone-700 dark:text-stone-200 text-lg leading-relaxed font-medium">
                {currentStep.description}
              </p>

              {/* Timer Widget Integration */}
              <TimerWidget initialMinutes={currentStep.timerMinutes || 5} title={`Step ${currentStepIndex + 1} Timer`} />
            </Card>

            {/* AI Assistant Chat inside Cooking Mode */}
            <Card className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2F7D4A]">
                <Bot className="w-4 h-4" />
                <span>AI Cooking Assistant</span>
              </div>

              <div className="max-h-36 overflow-y-auto space-y-2 text-xs">
                {chatMessages.map((m, idx) => (
                  <div key={idx} className={`p-2.5 rounded-xl ${m.sender === 'user' ? 'bg-[#2F7D4A] text-white self-end text-right' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200'}`}>
                    {m.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a quick cooking question... (e.g. How do I know onions are ready?)"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
                />
                <Button type="submit" variant="primary" size="sm">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
            </Card>
          </>
        ) : (
          /* Completion Rating Screen */
          <Card className="p-8 text-center space-y-6 max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#E1EFE5] text-[#2F7D4A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#172019] dark:text-white">Meal Complete! 🎉</h2>
              <p className="text-xs text-stone-500 mt-1">How did your dish turn out?</p>
            </div>

            {/* 1-5 Star Rating */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-2 transition-transform hover:scale-110 ${rating >= star ? 'text-amber-400' : 'text-stone-300'}`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>

            <div className="space-y-2 text-xs font-bold">
              <span>Would you cook this recipe again?</span>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setWouldCookAgain(true)}
                  className={`px-4 py-2 rounded-xl border ${wouldCookAgain ? 'bg-[#2F7D4A] text-white' : 'border-stone-200'}`}
                >
                  Yes, loved it!
                </button>
                <button
                  onClick={() => setWouldCookAgain(false)}
                  className={`px-4 py-2 rounded-xl border ${!wouldCookAgain ? 'bg-[#2F7D4A] text-white' : 'border-stone-200'}`}
                >
                  Not really
                </button>
              </div>
            </div>

            <Button variant="primary" size="lg" className="w-full" onClick={handleFinishCooking}>
              Save Rating & Update Inventory
            </Button>
          </Card>
        )}
      </main>

      {/* Bottom Step Navigation Bar */}
      {!isCompleted && (
        <footer className="p-4 bg-white dark:bg-[#172019] border-t border-stone-200 dark:border-stone-800 flex items-center justify-between max-w-4xl w-full mx-auto">
          <Button variant="outline" onClick={handlePrevStep} disabled={currentStepIndex === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous Step
          </Button>
          <Button variant="primary" size="lg" onClick={handleNextStep}>
            {currentStepIndex === steps.length - 1 ? 'Finish Recipe 🎉' : 'Next Step'} <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </footer>
      )}
    </div>
  );
}
