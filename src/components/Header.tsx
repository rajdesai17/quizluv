import React from 'react';
import { User, Home, BookOpen, Settings, Trophy } from 'lucide-react';
import { UserStats } from '../types/quiz';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: any) => void;
  userStats: UserStats;
}

const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, userStats }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">QuizApp</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentScreen === 'dashboard'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              About
            </button>
            <button className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Quiz
            </button>
            <button className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contact us
            </button>
          </nav>

          {/* User Profile & Stats */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{userStats.points}</span>
              </div>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex flex-col items-center py-2 px-3 text-xs ${
              currentScreen === 'dashboard' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span>Home</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-xs text-gray-600">
            <BookOpen className="w-5 h-5 mb-1" />
            <span>Quiz</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-xs text-gray-600">
            <Trophy className="w-5 h-5 mb-1" />
            <span>Stats</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-xs text-gray-600">
            <Settings className="w-5 h-5 mb-1" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;