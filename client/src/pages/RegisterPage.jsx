import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Button } from '../components/common/Button';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      addToast('Account created! Let\'s complete your kitchen onboarding.', 'success');
      navigate('/onboarding');
    } catch (err) {
      addToast(err.message || 'Registration failed.', 'error');
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
          <h2 className="text-3xl font-extrabold text-[#172019] dark:text-white">Create Account</h2>
          <p className="text-xs text-stone-500">Join What Can I Cook and eliminate kitchen food waste with AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-3 text-stone-400" />
              <input
                type="text"
                required
                placeholder="Aditya Saha"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
              />
            </div>
          </div>

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
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-3 text-stone-400" />
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full">
            Create Free Account <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#2F7D4A] hover:underline">Log in instead</Link>
        </div>
      </div>
    </div>
  );
}
