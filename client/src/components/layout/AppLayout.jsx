import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';
import { ToastContainer } from '../common/Toast';
import { CommandPalette } from '../common/CommandPalette';
import { AIChatDrawer } from '../common/AIChatDrawer';
import { useAuth } from '../../context/AuthContext';

export function AppLayout({ showFooter = false }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF5] dark:bg-[#0F1411]">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {user && <Sidebar />}
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 max-w-full overflow-hidden">
          <Outlet />
        </main>
      </div>

      {showFooter && <Footer />}

      {/* Global Overlays */}
      <ToastContainer />
      <CommandPalette />
      {user && <AIChatDrawer />}
      {user && <MobileNav />}
    </div>
  );
}
