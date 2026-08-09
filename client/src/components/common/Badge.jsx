import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-[#E1EFE5] text-[#205C36] dark:bg-[#1B4A2C] dark:text-[#E1EFE5]',
    brand: 'bg-[#2F7D4A] text-white',
    warning: 'bg-[#FFF8E6] text-[#B47814] border border-[#E5A72B]/30 dark:bg-[#382B14] dark:text-[#F3B562]',
    danger: 'bg-[#FDF2F2] text-[#D9534F] border border-[#D9534F]/20 dark:bg-[#3C1A1A] dark:text-red-300',
    accent: 'bg-[#FFF3E0] text-[#D97706] dark:bg-[#3D2800] dark:text-[#F3B562]',
    neutral: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
