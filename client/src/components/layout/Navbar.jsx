import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Search, Bell, Sparkles, User, LogOut, Command } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCommandPalette } from '../../context/CommandPaletteContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const { openPalette } = useCommandPalette();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#172019]/80 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#2F7D4A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-[#172019] dark:text-white">
              What Can I Cook?
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E1EFE5] text-[#205C36] dark:bg-[#1B4A2C] dark:text-[#E1EFE5]">
              AI Kitchen
            </span>
          </div>
        </Link>

        {/* Global Search / Command Palette Trigger */}
        <button
          onClick={openPalette}
          className="hidden md:flex items-center gap-3 px-4 py-2 bg-stone-100 dark:bg-stone-800/80 text-stone-500 dark:text-stone-400 rounded-2xl text-sm border border-transparent hover:border-stone-300 dark:hover:border-stone-700 transition-all w-64 lg:w-80"
        >
          <Search className="w-4 h-4 text-stone-400" />
          <span className="flex-1 text-left">Search ingredients, recipes...</span>
          <kbd className="flex items-center gap-1 font-mono text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 px-1.5 py-0.5 rounded text-stone-600 dark:text-stone-300">
            <Command className="w-3 h-3" />K
          </kbd>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => navigate('/scan')}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-[#E1EFE5] hover:bg-[#C2DFCB] text-[#205C36] font-bold rounded-xl text-sm transition-colors dark:bg-[#1B4A2C] dark:text-[#E1EFE5]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Scan Kitchen</span>
              </button>

              <button
                onClick={() => navigate('/notifications')}
                className="p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E5A72B]"></span>
              </button>

              <Link to="/profile" className="flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-stone-800">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#2F7D4A]"
                />
                <span className="hidden lg:inline-block font-semibold text-sm text-[#172019] dark:text-white">
                  {user.name}
                </span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-[#172019] dark:text-white hover:text-[#2F7D4A] transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-bold bg-[#2F7D4A] hover:bg-[#205C36] text-white rounded-xl shadow-md transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
