import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  currentScreen: string;
  onNavigate: (screen: 'welcome' | 'quiz' | 'results') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentScreen }) => {
  return (
    <nav className="hidden md:flex space-x-8">
      <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        currentScreen === 'welcome'
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
      }`}>
        Home
      </Link>
      <Link to="/quiz" className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
        Quiz
      </Link>
      <Link to="/leaderboard" className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
        Leaderboard
      </Link>
      {/* Results link removed per request */}
    </nav>
  );
};

export default Navbar;


