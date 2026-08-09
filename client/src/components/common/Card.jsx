import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, children, hoverEffect = true, ...props }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-[#172019] rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-soft p-5 transition-all duration-200',
        hoverEffect && 'hover:shadow-elevated hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return <div className={cn('mb-4 space-y-1', className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }) {
  return <h3 className={cn('text-lg font-bold text-[#172019] dark:text-white', className)} {...props}>{children}</h3>;
}

export function CardDescription({ className, children, ...props }) {
  return <p className={cn('text-sm text-[#6B746D] dark:text-stone-400', className)} {...props}>{children}</p>;
}

export function CardContent({ className, children, ...props }) {
  return <div className={cn('', className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }) {
  return <div className={cn('mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between', className)} {...props}>{children}</div>;
}
