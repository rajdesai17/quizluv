import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import Header from './components/Header';
import Layout from './components/Layout';
import { QuizData, UserStats, QuizResult, LeaderboardEntry } from './types/quiz';
import { fetchQuiz, postLeaderboard } from './api/client';
import NameModal from './components/NameModal';
import LeaderboardPage from './components/LeaderboardPage';

function App() {
  const navigate = useNavigate();
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
  const [playerName, setPlayerName] = useState<string>('');
  const [askNameOpen, setAskNameOpen] = useState<boolean>(false);

  const startQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      // For now always use quiz id 1
      const apiQuiz = await fetchQuiz(1);
      setCurrentQuizData({ id: apiQuiz.id, name: apiQuiz.name, questions: apiQuiz.questions });
      setSelectedCategory(apiQuiz.name);
      setCurrentScreen('quiz');
      navigate('/quiz');
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
    try {
      const key = 'quizluv_leaderboard';
      const existing = JSON.parse(localStorage.getItem(key) || '[]') as LeaderboardEntry[];
      const entry: LeaderboardEntry = {
        name: playerName || 'Player',
        score: result.score,
        category: result.category,
        time: result.timeSpent
      };
      const sanitized = [entry, ...existing].filter(e => Number.isFinite(e.score) && Number.isFinite(e.time));
      localStorage.setItem(key, JSON.stringify(sanitized.slice(0, 100)));
      // Attempt to also persist remotely; ignore failure to keep UX smooth
      postLeaderboard(entry).catch(() => {});
    } catch {}
    setCurrentScreen('results');
    navigate('/results');
  };

  const goToWelcome = () => {
    setCurrentScreen('welcome');
    navigate('/');
    setCurrentQuizData(null);
    setQuizResult(null);
  };

  const startNewQuiz = () => {
    setCurrentScreen('welcome');
  };

  return (
    <Layout>
      <Header 
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          navigate(screen === 'welcome' ? '/' : screen === 'quiz' ? '/quiz' : '/results');
        }}
        userStats={userStats}
      />

      <Routes>
        <Route
          path="/"
          element={
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
              <WelcomeScreen onStart={() => setAskNameOpen(true)} />
            </>
          }
        />
        <Route
          path="/quiz"
          element={currentQuizData ? (
            <QuizScreen
              quizData={currentQuizData}
              category={selectedCategory}
              onFinish={finishQuiz}
              onBack={goToWelcome}
            />
          ) : (
            <Navigate to="/" replace />
          )}
        />
        <Route
          path="/results"
          element={quizResult ? (
            <ResultsScreen
              result={quizResult}
              onBackToDashboard={goToWelcome}
              onStartNewQuiz={startNewQuiz}
            />
          ) : (
            <Navigate to="/" replace />
          )}
        />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <NameModal
        isOpen={askNameOpen}
        onClose={() => setAskNameOpen(false)}
        onConfirm={async (name) => {
          setPlayerName(name);
          setAskNameOpen(false);
          await startQuiz();
        }}
      />
    </Layout>
  );
}

export default App;