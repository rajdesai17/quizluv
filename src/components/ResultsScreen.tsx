import React from 'react';
import { Trophy, Star, RotateCcw, Home, Target, Clock, Award, TrendingUp } from 'lucide-react';
import { QuizResult } from '../types/quiz';

interface ResultsScreenProps {
  result: QuizResult;
  onBackToDashboard: () => void;
  onStartNewQuiz: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onBackToDashboard, onStartNewQuiz }) => {
  const getPerformanceMessage = () => {
    if (result.percentage >= 80) return "Excellent work! 🎉";
    if (result.percentage >= 60) return "Good job! 👍";
    if (result.percentage >= 40) return "Not bad! Keep practicing! 💪";
    return "Keep learning! You'll do better next time! 🌟";
  };

  const getGradeColor = () => {
    if (result.percentage >= 80) return "text-emerald-500";
    if (result.percentage >= 60) return "text-blue-500";
    if (result.percentage >= 40) return "text-yellow-500";
    return "text-coral-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            result.percentage >= 80 ? 'bg-green-100' : result.percentage >= 60 ? 'bg-blue-100' : 'bg-orange-100'
          }`}>
            <Trophy className={`w-12 h-12 ${
              result.percentage >= 80 ? 'text-green-600' : result.percentage >= 60 ? 'text-blue-600' : 'text-orange-600'
            }`} />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Quiz Complete!
          </h1>
          <p className="text-xl text-gray-600 mb-2">{getPerformanceMessage()}</p>
          <p className="text-gray-500">{result.category} Quiz Results</p>
        </div>

        {/* Main Results Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Score Display */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block">
                <div className="w-48 h-48 mx-auto lg:mx-0 rounded-full border-8 border-gray-200 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getGradeColor()}`}>
                      {result.percentage}%
                    </div>
                    <div className="text-lg text-gray-500">
                      {result.score}/{result.total} correct
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Points Earned */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="flex items-center justify-center space-x-3">
                  <Star className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">+{result.score * 10}</div>
                    <div className="text-sm text-gray-600">Points Earned</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{result.score}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-600">Time Taken</div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {result.percentage >= 80 ? 'A' : result.percentage >= 60 ? 'B' : result.percentage >= 40 ? 'C' : 'D'}
                </div>
                <div className="text-sm text-gray-600">Grade</div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">+5%</div>
                <div className="text-sm text-gray-600">Improvement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analysis */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Accuracy</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{result.percentage}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Speed</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Difficulty</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full w-3/5"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">Medium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onStartNewQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Try Another Quiz</span>
          </button>
          
          <button
            onClick={onBackToDashboard}
            className="bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Share Results */}
        <div className="text-center mt-8">
          <p className="text-gray-500 mb-4">Share your results with friends!</p>
          <div className="flex justify-center space-x-4">
            <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
              <span className="text-sm font-bold">f</span>
            </button>
            <button className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
              <span className="text-sm font-bold">t</span>
            </button>
            <button className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-colors">
              <span className="text-sm font-bold">w</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;