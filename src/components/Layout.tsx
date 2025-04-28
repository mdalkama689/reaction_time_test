import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Navigation />
        
        <main className="max-w-3xl mx-auto space-y-6 py-8">
          <Outlet />
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Reaction Time Test. Test your reflexes anytime.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;