import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Play, BarChart3 } from 'lucide-react';

const Navigation: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) => `
    flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
    ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}
  `;

  return (
    <nav className="flex justify-center space-x-4 my-6">
      <NavLink to="/" className={linkClass} end>
        <Home size={18} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/play" className={linkClass}>
        <Play size={18} />
        <span>Play</span>
      </NavLink>
      <NavLink to="/results" className={linkClass}>
        <BarChart3 size={18} />
        <span>Results</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;