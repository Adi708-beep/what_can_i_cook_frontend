import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';

// Page Imports
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ScanPage } from './pages/ScanPage';
import { ScanHistoryPage } from './pages/ScanHistoryPage';
import { FridgePage } from './pages/FridgePage';
import { PantryPage } from './pages/PantryPage';
import { FreezerPage } from './pages/FreezerPage';
import { InventoryPage } from './pages/InventoryPage';
import { InventoryDetailPage } from './pages/InventoryDetailPage';
import { RecipesPage } from './pages/RecipesPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { GenerateRecipePage } from './pages/GenerateRecipePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CookingModePage } from './pages/CookingModePage';
import { MealPlannerPage } from './pages/MealPlannerPage';
import { ShoppingListPage } from './pages/ShoppingListPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Route Guards
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-12 text-center text-stone-400">Loading AI Kitchen...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route element={<AppLayout showFooter={true} />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Auth Public Routes */}
      <Route element={<AppLayout />}>
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Full-Screen Interactive Cooking Mode */}
      <Route path="/cook/:recipeId" element={<ProtectedRoute><CookingModePage /></ProtectedRoute>} />

      {/* Authenticated Protected Routes */}
      <Route element={<AppLayout />}>
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        
        {/* Scanner */}
        <Route path="/scan" element={<ProtectedRoute><ScanPage /></ProtectedRoute>} />
        <Route path="/scan/history" element={<ProtectedRoute><ScanHistoryPage /></ProtectedRoute>} />
        
        {/* Kitchen Storage */}
        <Route path="/fridge" element={<ProtectedRoute><FridgePage /></ProtectedRoute>} />
        <Route path="/pantry" element={<ProtectedRoute><PantryPage /></ProtectedRoute>} />
        <Route path="/freezer" element={<ProtectedRoute><FreezerPage /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
        <Route path="/inventory/:id" element={<ProtectedRoute><InventoryDetailPage /></ProtectedRoute>} />
        
        {/* Recipes & Discovery */}
        <Route path="/recipes" element={<ProtectedRoute><RecipesPage /></ProtectedRoute>} />
        <Route path="/recipes/generate" element={<ProtectedRoute><GenerateRecipePage /></ProtectedRoute>} />
        <Route path="/recipes/:id" element={<ProtectedRoute><RecipeDetailPage /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
        
        {/* Planning & Shopping */}
        <Route path="/meal-planner" element={<ProtectedRoute><MealPlannerPage /></ProtectedRoute>} />
        <Route path="/shopping-list" element={<ProtectedRoute><ShoppingListPage /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        
        {/* User Account */}
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
