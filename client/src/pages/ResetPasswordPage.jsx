import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password/token123', { password });
      addToast('Password reset successful! Please log in.', 'success');
      navigate('/login');
    } catch (err) {
      addToast(err.message || 'Reset failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-[#172019] p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-elevated">
        <div>
          <h2 className="text-2xl font-extrabold text-[#172019] dark:text-white">Create New Password</h2>
          <p className="text-xs text-stone-500 mt-1">Please enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">New Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-3 text-stone-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-3 text-stone-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full">
            Save New Password
          </Button>
        </form>
      </div>
    </div>
  );
}
