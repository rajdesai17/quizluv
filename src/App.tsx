import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import Header from './components/Header';
import { QuizData, UserStats, QuizResult } from './types/quiz';
import { fetchQuiz } from './api/client';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<string>('General Knowledge');
  const [currentQuizData, setCurrentQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    points: 2300,
    trophies: 32,
    completedQuizzes: 15,
    averageScore: 85
  });
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const startQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      // For now always use quiz id 1
      const apiQuiz = await fetchQuiz(1);
      setCurrentQuizData({ id: apiQuiz.id, name: apiQuiz.name, questions: apiQuiz.questions });
      setSelectedCategory(apiQuiz.name);
      setCurrentScreen('quiz');
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to load quiz';
      setError(message);
    } finally {
      setLoading(false);
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
        <>
          {error && (
            <div className="max-w-2xl mx-auto mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">
              {error}
            </div>
          )}
          {loading && (
            <div className="max-w-2xl mx-auto mt-4 p-3 bg-blue-50 text-blue-700 border border-blue-200 rounded">
              Loading quiz...
            </div>
          )}
          <WelcomeScreen onStart={startQuiz} />
        </>
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