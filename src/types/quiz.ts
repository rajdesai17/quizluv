export interface ClientOption { id: number; text: string }
export interface ClientQuestion { id: number; text: string; options: ClientOption[] }
export interface QuizData { id: number; name: string; questions: ClientQuestion[] }

export interface UserStats {
  points: number;
  trophies: number;
  completedQuizzes: number;
  averageScore: number;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  timeSpent: number;
  category: string;
  results?: Array<{
    questionId: number;
    questionText: string;
    options: { A: string; B: string; C: string; D: string };
    userAnswer: 'A' | 'B' | 'C' | 'D' | null;
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    isCorrect: boolean;
  }>;
}

export interface RecentResult {
  id: number;
  category: string;
  score: number;
  total: number;
  progress: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  category: string;
  time: number; // seconds
}