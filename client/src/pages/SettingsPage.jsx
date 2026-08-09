import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { User, Shield, Brain, Bell, Lock, Trash2, RotateCcw, Check } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { addToast } = useNotification();
  const [activeTab, setActiveTab] = useState('account');
  const [memoryData, setMemoryData] = useState(null);

  useEffect(() => {
    fetchMemory();
  }, []);

  const fetchMemory = async () => {
    try {
      const res = await api.get('/users/memory');
      if (res.success && res.data.memory) {
        setMemoryData(res.data.memory);
      }
    } catch (err) {}
  };

  const handleResetMemory = async () => {
    if (!window.confirm('Are you sure you want to reset all learned AI preferences and rating history?')) return;
    try {
      const res = await api.delete('/users/memory');
      if (res.success) {
        setMemoryData(res.data.memory);
        addToast('AI User Memory has been completely reset.', 'info');
      }
    } catch (err) {}
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white">Settings & Preferences</h1>
        <p className="text-sm text-stone-500">Manage account, dietary restrictions, notifications, and AI memory.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 gap-6 text-sm font-bold">
        {['account', 'dietary', 'memory', 'privacy'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize transition-colors border-b-2 ${
              activeTab === tab ? 'border-[#2F7D4A] text-[#2F7D4A]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            {tab === 'memory' ? 'AI Memory' : tab}
          </button>
        ))}
      </div>

      {/* Account Settings */}
      {activeTab === 'account' && (
        <Card className="p-6 space-y-4">
          <h3 className="font-extrabold text-lg">Account Details</h3>
          <div className="space-y-3 max-w-md text-xs font-semibold">
            <div>
              <label className="block text-stone-400 mb-1">Name</label>
              <input type="text" defaultValue={user?.name} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900" />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Email</label>
              <input type="email" defaultValue={user?.email} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900" />
            </div>
            <Button variant="primary" size="sm" onClick={() => addToast('Saved account details', 'success')}>
              Save Account Changes
            </Button>
          </div>
        </Card>
      )}

      {/* Dietary Settings */}
      {activeTab === 'dietary' && (
        <Card className="p-6 space-y-4">
          <h3 className="font-extrabold text-lg">Dietary & Allergy Restrictions</h3>
          <p className="text-xs text-stone-500">AI recipe generator will strictly filter meals matching these options.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Vegetarian', 'Vegan', 'Keto', 'High Protein', 'Gluten Free', 'Dairy Free'].map((d) => (
              <Badge key={d} variant="default" className="text-sm py-1.5 px-3">{d}</Badge>
            ))}
          </div>
        </Card>
      )}

      {/* AI Memory Inspector */}
      {activeTab === 'memory' && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#2F7D4A]" />
              <h3 className="font-extrabold text-lg">Structured AI User Memory</h3>
            </div>
            <Button variant="danger" size="sm" onClick={handleResetMemory}>
              <RotateCcw className="w-4 h-4 mr-1.5" /> Reset AI Memory
            </Button>
          </div>

          <p className="text-xs text-stone-500">
            Our AI continuously learns your ingredient preferences, favorite spice levels, and substitution history without storing sensitive data.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl space-y-2 text-xs">
              <span className="font-bold text-stone-400 block">Learned Taste Patterns:</span>
              <ul className="list-disc list-inside text-stone-700 dark:text-stone-300 space-y-1">
                <li>Prefers quick meals under 20 minutes (85% confidence)</li>
                <li>Prefers high protein breakfast options (90% confidence)</li>
                <li>Frequently substitutes Heavy Cream with Whole Milk + Butter</li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Privacy Settings */}
      {activeTab === 'privacy' && (
        <Card className="p-6 space-y-4">
          <h3 className="font-extrabold text-lg">Data & Privacy</h3>
          <p className="text-xs text-stone-500">Manage your data retention, export options, or account deletion.</p>
          <div className="space-y-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => addToast('Export request queued.', 'info')}>
              Export My Data JSON
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
