import React, { useState, useEffect } from 'react';
import { Trophy, Star, ArrowLeft, Clock, Flag, User, Home, BookOpen, Settings } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import Header from './components/Header';
import { QuizData, UserStats, QuizResult } from './types/quiz';
import { quizData } from './data/quizData';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'dashboard' | 'quiz' | 'results'>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentQuizData, setCurrentQuizData] = useState<QuizData | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    points: 2300,
    trophies: 32,
    completedQuizzes: 15,
    averageScore: 85
  });
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [recentResults, setRecentResults] = useState([
    { id: 1, category: 'Science and Technology', score: 6, total: 10, progress: 60 },
    { id: 2, category: 'Featured Categories', score: 9, total: 10, progress: 90 },
    { id: 3, category: 'Featured Categories', score: 3, total: 10, progress: 30 }
  ]);

  const startQuiz = (category: string) => {
    const categoryQuiz = quizData[category];
    if (categoryQuiz) {
      setSelectedCategory(category);
      setCurrentQuizData(categoryQuiz);
      setCurrentScreen('quiz');
    }
  };

  const finishQuiz = (result: QuizResult) => {
    setQuizResult(result);
    setUserStats(prev => ({
      ...prev,
      points: prev.points + (result.score * 10),
      completedQuizzes: prev.completedQuizzes + 1
    }));
    setCurrentScreen('results');
  };

  const goToDashboard = () => {
    setCurrentScreen('dashboard');
    setCurrentQuizData(null);
    setQuizResult(null);
  };

  const startNewQuiz = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen !== 'welcome' && (
        <Header 
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          userStats={userStats}
        />
      )}
      
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={() => setCurrentScreen('dashboard')} />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard
          userStats={userStats}
          recentResults={recentResults}
          onStartQuiz={startQuiz}
        />
      )}
      
      {currentScreen === 'quiz' && currentQuizData && (
        <QuizScreen
          quizData={currentQuizData}
          category={selectedCategory}
          onFinish={finishQuiz}
          onBack={goToDashboard}
        />
      )}
      
      {currentScreen === 'results' && quizResult && (
        <ResultsScreen
          result={quizResult}
          onBackToDashboard={goToDashboard}
          onStartNewQuiz={startNewQuiz}
        />
      )}
    </div>
  );
}

export default App;