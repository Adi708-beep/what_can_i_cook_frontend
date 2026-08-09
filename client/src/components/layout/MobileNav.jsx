import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Refrigerator, Camera, Utensils, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#172019]/90 backdrop-blur-lg border-t border-stone-200 dark:border-stone-800 px-4 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn('flex flex-col items-center gap-1 text-xs font-semibold', isActive ? 'text-[#2F7D4A]' : 'text-stone-400')
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/fridge"
          className={({ isActive }) =>
            cn('flex flex-col items-center gap-1 text-xs font-semibold', isActive ? 'text-[#2F7D4A]' : 'text-stone-400')
          }
        >
          <Refrigerator className="w-5 h-5" />
          <span>Kitchen</span>
        </NavLink>

        {/* Prominent Center Action */}
        <NavLink
          to="/scan"
          className="flex flex-col items-center -mt-6"
        >
          <div className="w-13 h-13 rounded-full bg-[#2F7D4A] hover:bg-[#205C36] text-white flex items-center justify-center shadow-lg border-4 border-[#FAFAF5] dark:border-[#0F1411] transition-transform active:scale-95">
            <Camera className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-[#2F7D4A] mt-0.5">Scan</span>
        </NavLink>

        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            cn('flex flex-col items-center gap-1 text-xs font-semibold', isActive ? 'text-[#2F7D4A]' : 'text-stone-400')
          }
        >
          <Utensils className="w-5 h-5" />
          <span>Recipes</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            cn('flex flex-col items-center gap-1 text-xs font-semibold', isActive ? 'text-[#2F7D4A]' : 'text-stone-400')
          }
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}
