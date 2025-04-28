import React from 'react';
import { Clock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center p-6 text-white">
      <div className="flex items-center space-x-2">
        <Clock size={28} className="text-blue-400" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Reaction <span className="text-blue-400">Time</span> Test
        </h1>
      </div>
    </header>
  );
};

export default Header;