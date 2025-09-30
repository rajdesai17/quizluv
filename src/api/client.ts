export interface ApiOption { id: number; text: string }
export interface ApiQuestion { id: number; text: string; options: ApiOption[] }
export interface ApiQuiz { id: number; name: string; questions: ApiQuestion[] }

export type AnswerLetter = 'A' | 'B' | 'C' | 'D';
export interface DetailedResultItem {
  questionId: number;
  questionText: string;
  options: { A: string; B: string; C: string; D: string };
  userAnswer: AnswerLetter | null;
  correctAnswer: AnswerLetter;
  isCorrect: boolean;
}
export interface SubmitResult { score: number; total: number; percentage: number; results?: DetailedResultItem[] }

const API_BASE_URL = (import.meta.env?.VITE_API_BASE_URL ?? 'http://localhost:4000') + '/api';

export async function fetchQuiz(quizId: number): Promise<ApiQuiz> {
  const res = await fetch(`${API_BASE_URL}/quizzes/${quizId}/questions`);
  if (!res.ok) {
    throw new Error(`Failed to fetch quiz: ${res.status}`);
  }
  const body = await res.json();
  if (body?.success !== true) throw new Error(body?.error || 'Failed to fetch quiz');
  return body.data as ApiQuiz;
}

export async function submitQuiz(quizId: number, answers: Record<number, AnswerLetter>, timeTakenSeconds: number): Promise<SubmitResult> {
  const res = await fetch(`${API_BASE_URL}/quizzes/${quizId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, timeTakenSeconds })
  });
  if (!res.ok) {
    throw new Error(`Failed to submit quiz: ${res.status}`);
  }
  const body = await res.json();
  if (body?.success !== true) {
    const err = new Error(body?.error || 'Failed to submit quiz');
    throw err;
  }
  const data = body.data as { score: number; totalQuestions: number; percentage: number; results?: DetailedResultItem[] };
  return { score: data.score, total: data.totalQuestions, percentage: data.percentage, results: data.results };
}


