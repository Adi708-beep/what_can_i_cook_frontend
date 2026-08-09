import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import api from '../lib/api';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-[#172019] p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-elevated">
        <Link to="/login" className="inline-flex items-center text-xs font-semibold text-[#2F7D4A] hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Log In
        </Link>

        {sent ? (
          <div className="text-center space-y-3 py-4">
            <CheckCircle className="w-12 h-12 text-[#2F7D4A] mx-auto" />
            <h3 className="text-2xl font-bold text-[#172019] dark:text-white">Reset Link Sent!</h3>
            <p className="text-xs text-stone-500">Check your email inbox for instructions to reset your password.</p>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-extrabold text-[#172019] dark:text-white">Reset Password</h2>
              <p className="text-xs text-stone-500 mt-1">Enter your email and we'll send a password recovery link.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">Email</label>
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

              <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full">
                Send Reset Link
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
