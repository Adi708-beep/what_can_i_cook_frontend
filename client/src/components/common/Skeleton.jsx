import React from 'react';
import { cn } from '../../lib/utils';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-stone-200 dark:bg-stone-800', className)}
      {...props}
    />
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#172019] rounded-2xl p-4 border border-stone-200 dark:border-stone-800 space-y-3">
      <Skeleton className="h-44 w-full rounded-xl" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}
