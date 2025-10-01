import React from 'react';
import { BookOpen, Trophy, Users, Clock } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex items-center justify-center px-4 animate-fadeIn pt-16 lg:pt-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Test Your
              <span className="text-blue-600 block">Knowledge</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Challenge yourself with our interactive quizzes across multiple categories. 
              Learn, compete, and track your progress.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onStart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Quiz Now
            </button>
            <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-lg transition-all duration-200">
              Learn More
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-900">Achievements</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-sm font-medium text-gray-900">Leaderboard</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-sm font-medium text-gray-900">Timed Quizzes</div>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Sample Quiz</h3>
                <div className="text-sm text-gray-500">Question 1/5</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-1/5"></div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-800">
                  What is the capital of France?
                </h4>
                
                <div className="space-y-3">
                  <div className="p-3 border-2 border-blue-200 bg-blue-50 rounded-lg cursor-pointer">
                    <span className="text-gray-800">Paris</span>
                  </div>
                  <div className="p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                    <span className="text-gray-800">London</span>
                  </div>
                  <div className="p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                    <span className="text-gray-800">Berlin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;