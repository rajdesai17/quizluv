import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import Header from './components/Header';
import { QuizData, UserStats, QuizResult } from './types/quiz';
import { quizData } from './data/quizData';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentQuizData, setCurrentQuizData] = useState<QuizData | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    points: 2300,
    trophies: 32,
    completedQuizzes: 15,
    averageScore: 85
  });
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const startQuiz = () => {
    // Use the first available quiz category
    const firstCategory = Object.keys(quizData)[0];
    const categoryQuiz = quizData[firstCategory];
    if (categoryQuiz) {
      setSelectedCategory(firstCategory);
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

  const goToWelcome = () => {
    setCurrentScreen('welcome');
    setCurrentQuizData(null);
    setQuizResult(null);
  };

  const startNewQuiz = () => {
    setCurrentScreen('welcome');
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
        <WelcomeScreen onStart={startQuiz} />
      )}
      
      {currentScreen === 'quiz' && currentQuizData && (
        <QuizScreen
          quizData={currentQuizData}
          category={selectedCategory}
          onFinish={finishQuiz}
          onBack={goToWelcome}
        />
      )}
      
      {currentScreen === 'results' && quizResult && (
        <ResultsScreen
          result={quizResult}
          onBackToDashboard={goToWelcome}
          onStartNewQuiz={startNewQuiz}
        />
      )}
    </div>
  );
}

export default App;