import React from 'react';
import { Trophy, Star, User, Home, Timer, CircleUser as UserCircle, TrendingUp, Award, Clock, Target } from 'lucide-react';
import { UserStats, RecentResult } from '../types/quiz';
import CategoryCard from './CategoryCard';

interface DashboardProps {
  userStats: UserStats;
  recentResults: RecentResult[];
  onStartQuiz: (category: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userStats, recentResults, onStartQuiz }) => {
  const categories = [
    { name: 'Animals', icon: '🦁', color: 'bg-yellow-100 text-yellow-800', questions: 25 },
    { name: 'Science', icon: '⚗️', color: 'bg-blue-100 text-blue-800', questions: 30 },
    { name: 'Math', icon: '📊', color: 'bg-green-100 text-green-800', questions: 20 },
    { name: 'Geography', icon: '🌍', color: 'bg-purple-100 text-purple-800', questions: 28 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-4 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  👋 Welcome back, Pamela!
                </h1>
                <p className="text-gray-600">Ready to challenge yourself today?</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{userStats.points}</div>
                  <div className="text-sm text-gray-500">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{userStats.trophies}</div>
                  <div className="text-sm text-gray-500">Trophies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.completedQuizzes}</div>
                  <div className="text-sm text-gray-500">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{userStats.averageScore}%</div>
                    <div className="text-sm text-gray-500">Avg Score</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">+12%</div>
                    <div className="text-sm text-gray-500">This Week</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">5</div>
                    <div className="text-sm text-gray-500">Streak</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">2.5m</div>
                    <div className="text-sm text-gray-500">Avg Time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Categories */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Quiz Categories</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {categories.map((category, index) => (
                  <div
                    key={category.name}
                    onClick={() => onStartQuiz(category.name)}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${category.color}`}>
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-500">{category.questions} Questions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">85%</div>
                        <div className="text-xs text-gray-500">Best Score</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Challenge */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Daily Challenge</h3>
                  <p className="text-sm opacity-90">Complete today's quiz</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-xs opacity-75 mb-1">Progress: 3/5</div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
                Continue Challenge
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentResults.map((result, index) => (
                  <div key={result.id} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-orange-500'
                    }`}>
                      {result.score}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {result.category}
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.score}/{result.total} correct
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      2h ago
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Leaderboard</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">You</div>
                    <div className="text-xs text-gray-500">2,300 points</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Alex</div>
                    <div className="text-xs text-gray-500">2,150 points</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Sarah</div>
                    <div className="text-xs text-gray-500">1,980 points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;