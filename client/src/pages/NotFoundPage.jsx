import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-[#E1EFE5] text-[#2F7D4A] flex items-center justify-center mx-auto">
        <ChefHat className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-[#172019] dark:text-white">404 — Page Not Found</h1>
      <p className="text-stone-500 max-w-sm text-sm">
        Looks like this recipe page doesn't exist in our AI kitchen library.
      </p>
      <Link to="/dashboard">
        <Button variant="primary">
          <ArrowLeft className="w-4 h-4 mr-2" /> Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
