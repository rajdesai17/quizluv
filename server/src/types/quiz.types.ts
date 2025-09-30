import { z } from 'zod';

export const AnswerLetterSchema = z.enum(['A', 'B', 'C', 'D']);
export type AnswerLetter = z.infer<typeof AnswerLetterSchema>;

export const SubmitQuizSchema = z.object({
  answers: z.record(
    z.string().regex(/^\d+$/),
    AnswerLetterSchema
  ),
  timeTakenSeconds: z.number().int().min(0)
});

export type SubmitQuizRequest = z.infer<typeof SubmitQuizSchema>;

export interface QuizListOption { id: number; text: string }
export interface QuizListQuestion { id: number; text: string; options: QuizListOption[] }
export interface QuizPayload { id: number; name: string; questions: QuizListQuestion[] }

export interface DetailedResultItem {
  questionId: number;
  questionText: string;
  options: { A: string; B: string; C: string; D: string };
  userAnswer: 'A' | 'B' | 'C' | 'D' | null;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
}

export interface SubmitResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  results: DetailedResultItem[];
}


