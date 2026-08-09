import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { User, Award, Flame, Utensils, Shield, Leaf, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <Card className="p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
          alt={user?.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-[#2F7D4A] shadow-md"
        />
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white">{user?.name}</h1>
              <p className="text-sm text-stone-500">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/settings')}>
              <Settings className="w-4 h-4 mr-1.5" /> Edit Profile & Settings
            </Button>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
            <Badge variant="brand">{user?.cookingSkill || 'Intermediate'} Chef</Badge>
            <Badge variant="default">7-Day Streak 🔥</Badge>
            <Badge variant="accent">Waste Warrior 🛡️</Badge>
          </div>
        </div>
      </Card>

      {/* Cooking Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <Card className="p-4">
          <Utensils className="w-6 h-6 text-[#2F7D4A] mx-auto mb-1" />
          <span className="text-2xl font-extrabold text-[#172019] dark:text-white">24</span>
          <span className="text-xs text-stone-400 block font-bold">Recipes Cooked</span>
        </Card>
        <Card className="p-4">
          <Leaf className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
          <span className="text-2xl font-extrabold text-[#172019] dark:text-white">38</span>
          <span className="text-xs text-stone-400 block font-bold">Items Used Before Expiry</span>
        </Card>
        <Card className="p-4">
          <Flame className="w-6 h-6 text-amber-500 mx-auto mb-1" />
          <span className="text-2xl font-extrabold text-[#172019] dark:text-white">$145.50</span>
          <span className="text-xs text-stone-400 block font-bold">Waste Saved (Est.)</span>
        </Card>
        <Card className="p-4">
          <Award className="w-6 h-6 text-purple-500 mx-auto mb-1" />
          <span className="text-2xl font-extrabold text-[#172019] dark:text-white">87%</span>
          <span className="text-xs text-stone-400 block font-bold">Waste Score</span>
        </Card>
      </div>

      {/* Dietary & Allergy Preferences Overview */}
      <Card className="p-6 space-y-4">
        <h3 className="font-extrabold text-lg text-[#172019] dark:text-white">Dietary & Allergy Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl space-y-2">
            <span className="font-bold text-stone-400 uppercase block">Dietary Preferences</span>
            <div className="flex flex-wrap gap-1.5">
              {user?.dietaryPreferences?.map((d) => (
                <Badge key={d} variant="default">{d}</Badge>
              )) || <span className="text-stone-400">None specified</span>}
            </div>
          </div>

          <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl space-y-2">
            <span className="font-bold text-stone-400 uppercase block">Allergies (Restricted)</span>
            <div className="flex flex-wrap gap-1.5">
              {user?.allergies?.map((a) => (
                <Badge key={a} variant="danger">{a}</Badge>
              )) || <span className="text-stone-400">No allergies listed</span>}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
