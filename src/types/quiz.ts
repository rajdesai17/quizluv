export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizData {
  category: string;
  questions: Question[];
}

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
}

export interface RecentResult {
  id: number;
  category: string;
  score: number;
  total: number;
  progress: number;
}