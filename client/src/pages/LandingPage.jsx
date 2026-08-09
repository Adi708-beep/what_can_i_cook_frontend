import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Camera, Sparkles, Refrigerator, Clock, ShieldCheck, Heart, ArrowRight, CheckCircle, Leaf, Zap, BarChart3, HelpCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative pt-8 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1EFE5] dark:bg-[#1B4A2C] text-[#205C36] dark:text-[#E1EFE5] text-xs font-bold tracking-wide">
            <Sparkles className="w-4 h-4 text-[#F3B562]" />
            <span>Next-Gen AI Kitchen Assistant</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172019] dark:text-white tracking-tight leading-[1.15]">
            What can you cook with what you <span className="text-[#2F7D4A] dark:text-[#5FA67A]">already have?</span>
          </h1>

          <p className="text-lg text-stone-600 dark:text-stone-300 max-w-xl leading-relaxed">
            Scan your fridge, discover available ingredients, and let AI create personalized recipes while helping you use food before it expires. Less waste, more delicious meals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-glow text-base" onClick={() => navigate('/scan')}>
              <Camera className="w-5 h-5 mr-2" />
              Scan My Kitchen
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base" onClick={() => navigate('/recipes')}>
              Explore Recipes
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-stone-500 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#2F7D4A]" /> No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#2F7D4A]" /> Smart Expiry Intelligence
            </div>
          </div>
        </div>

        {/* Hero Visual Mockup with Animated AI Scanning */}
        <div className="relative mx-auto max-w-md lg:max-w-none w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 bg-stone-900 group">
            <img
              src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=1000"
              alt="AI Kitchen Fridge Scan"
              className="w-full h-[420px] object-cover opacity-90"
            />
            {/* Animated Laser Scanning Overlay */}
            <div className="animate-scan-line"></div>

            {/* AI Floating Badges */}
            <div className="absolute top-8 left-6 bg-white/90 dark:bg-[#172019]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-white/20 flex items-center gap-2 text-xs font-bold">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-[#172019] dark:text-white">Fresh Spinach (94% Conf.)</span>
            </div>

            <div className="absolute bottom-10 right-6 bg-white/90 dark:bg-[#172019]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-white/20 flex items-center gap-2 text-xs font-bold">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <span className="text-[#172019] dark:text-white">Milk (Expires Tomorrow)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-[#2F7D4A] text-white py-12 rounded-3xl max-w-7xl mx-auto px-6 shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">87%</div>
            <div className="text-xs sm:text-sm text-emerald-100 mt-1">Average Waste Reduction</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">$180+</div>
            <div className="text-xs sm:text-sm text-emerald-100 mt-1">Saved Per Month / User</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">10,000+</div>
            <div className="text-xs sm:text-sm text-emerald-100 mt-1">AI Recipes Generated</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">4.9 ★</div>
            <div className="text-xs sm:text-sm text-emerald-100 mt-1">Culinary Satisfaction</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172019] dark:text-white">
            How What Can I Cook Works
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            Four simple steps from an unorganized fridge to a gourmet home-cooked meal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E1EFE5] text-[#2F7D4A] font-extrabold text-xl flex items-center justify-center mx-auto">1</div>
            <h3 className="font-bold text-lg">Scan Kitchen</h3>
            <p className="text-xs text-stone-500">Snap a quick photo of your fridge, pantry, or countertop.</p>
          </Card>
          <Card className="text-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E1EFE5] text-[#2F7D4A] font-extrabold text-xl flex items-center justify-center mx-auto">2</div>
            <h3 className="font-bold text-lg">AI Recognizes Food</h3>
            <p className="text-xs text-stone-500">Multimodal vision model detects ingredients with confidence scores.</p>
          </Card>
          <Card className="text-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E1EFE5] text-[#2F7D4A] font-extrabold text-xl flex items-center justify-center mx-auto">3</div>
            <h3 className="font-bold text-lg">Get Recipes</h3>
            <p className="text-xs text-stone-500">AI prioritizes expiring items and generates personalized recipes.</p>
          </Card>
          <Card className="text-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E1EFE5] text-[#2F7D4A] font-extrabold text-xl flex items-center justify-center mx-auto">4</div>
            <h3 className="font-bold text-lg">Cook & Track</h3>
            <p className="text-xs text-stone-500">Follow interactive cooking mode; inventory updates automatically!</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-stone-900 text-white rounded-3xl max-w-7xl mx-auto px-8 py-16 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold">Ready to transform your kitchen?</h2>
        <p className="text-stone-400 max-w-xl mx-auto text-base">
          Join thousands of home chefs cutting food waste and enjoying effortless meal preparation.
        </p>
        <Button size="lg" variant="primary" className="shadow-glow" onClick={() => navigate('/register')}>
          Get Started For Free
        </Button>
      </section>
    </div>
  );
}
