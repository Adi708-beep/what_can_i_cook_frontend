import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Heart, Shield, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <div className="p-2 rounded-xl bg-[#2F7D4A] text-white">
              <ChefHat className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-xl">What Can I Cook?</span>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed">
            Turn what you already have into what you want to eat. Smart AI ingredient scanner & food waste reduction platform.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#F3B562]">
            <Leaf className="w-4 h-4 text-[#2F7D4A]" />
            <span>Over 140+ lbs of food waste saved this month</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Features</h4>
          <ul className="space-y-2.5 text-sm text-stone-400">
            <li><Link to="/scan" className="hover:text-white transition-colors">AI Fridge Scanner</Link></li>
            <li><Link to="/recipes" className="hover:text-white transition-colors">Recipe Generator</Link></li>
            <li><Link to="/meal-planner" className="hover:text-white transition-colors">Weekly Meal Planner</Link></li>
            <li><Link to="/shopping-list" className="hover:text-white transition-colors">Smart Shopping List</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Product Vision</h4>
          <ul className="space-y-2.5 text-sm text-stone-400">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing & Pro Plan</Link></li>
            <li><Link to="/features" className="hover:text-white transition-colors">Expiry Intelligence</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Legal & Safety</h4>
          <ul className="space-y-2.5 text-sm text-stone-400">
            <li><Link to="/settings/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/settings/account" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li className="flex items-center gap-1.5 text-stone-400 text-xs mt-3 pt-3 border-t border-stone-800">
              <Shield className="w-4 h-4 text-[#2F7D4A]" />
              <span>AI recommendations for guidance only. Always check food freshness.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
        <p>© 2026 What Can I Cook? Inc. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for home chefs worldwide.
        </p>
      </div>
    </footer>
  );
}
