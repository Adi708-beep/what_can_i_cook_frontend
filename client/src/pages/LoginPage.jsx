import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Button } from '../components/common/Button';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      addToast(`Welcome back, ${user.name || 'Chef'}!`, 'success');
      navigate(user.onboardingCompleted ? '/dashboard' : '/onboarding');
    } catch (err) {
      addToast(err.message || 'Login failed. Please check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#172019] p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-elevated">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#2F7D4A] text-white flex items-center justify-center mx-auto shadow-md">
            <ChefHat className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#172019] dark:text-white">Welcome Back</h2>
          <p className="text-xs text-stone-500">Log in to manage your kitchen & discovery personalized AI recipes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-3 text-stone-400" />
              <input
                type="email"
                required
                placeholder="aditya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300">Password</label>
              <Link to="/forgot-password" className="text-xs font-semibold text-[#2F7D4A] hover:underline">Forgot password?</Link>
            </div>
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

          <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full">
            Log In <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-[#2F7D4A] hover:underline">Create free account</Link>
        </div>
      </div>
    </div>
  );
}
