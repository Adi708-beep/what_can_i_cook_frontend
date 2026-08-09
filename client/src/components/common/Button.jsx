import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  children,
  isLoading,
  disabled,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const variants = {
    primary: 'bg-[#2F7D4A] hover:bg-[#205C36] text-white shadow-md hover:shadow-lg focus:ring-[#2F7D4A]',
    secondary: 'bg-[#E1EFE5] text-[#205C36] hover:bg-[#C2DFCB] dark:bg-[#1B4A2C] dark:text-[#E1EFE5] dark:hover:bg-[#205C36]',
    outline: 'border border-[#CBD5E1] text-[#172019] hover:bg-black/5 dark:border-[#334155] dark:text-white dark:hover:bg-white/5',
    ghost: 'text-[#172019] hover:bg-black/5 dark:text-white dark:hover:bg-white/5',
    danger: 'bg-[#D9534F] hover:bg-red-700 text-white focus:ring-[#D9534F]',
    accent: 'bg-[#F3B562] hover:bg-amber-500 text-stone-900 font-bold shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5',
    icon: 'p-2.5 rounded-xl',
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
      ) : children}
    </button>
  );
});

Button.displayName = 'Button';
