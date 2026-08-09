import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Refrigerator, Package, Snowflake, Camera, Utensils, Heart, Calendar, ShoppingBag, Bell, User, Settings, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Fridge', icon: Refrigerator, path: '/fridge' },
    { label: 'Pantry', icon: Package, path: '/pantry' },
    { label: 'Freezer', icon: Snowflake, path: '/freezer' },
    { label: 'AI Scan', icon: Camera, path: '/scan', badge: 'AI' },
    { label: 'Recipes', icon: Utensils, path: '/recipes' },
    { label: 'Favorites', icon: Heart, path: '/favorites' },
    { label: 'Meal Planner', icon: Calendar, path: '/meal-planner' },
    { label: 'Shopping List', icon: ShoppingBag, path: '/shopping-list' },
    { label: 'Notifications', icon: Bell, path: '/notifications' },
  ];

  const bottomItems = [
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#172019] border-r border-stone-200 dark:border-stone-800 p-4 h-[calc(100vh-4rem)] sticky top-16 shrink-0 justify-between overflow-y-auto">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-stone-400">
          Kitchen Engine
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all group',
                  isActive
                    ? 'bg-[#2F7D4A] text-white shadow-md'
                    : 'text-[#172019] dark:text-stone-300 hover:bg-[#E1EFE5] dark:hover:bg-[#1B4A2C] hover:text-[#205C36]'
                )
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-md bg-[#F3B562] text-stone-900">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all',
                  isActive
                    ? 'bg-stone-100 dark:bg-stone-800 text-[#2F7D4A]'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                )
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm text-[#D9534F] hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-left"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
