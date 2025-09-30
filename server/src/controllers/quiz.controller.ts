import { Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { SubmitQuizSchema, QuizPayload, SubmitResult, AnswerLetterSchema, AnswerLetter } from '../types/quiz.types';

export function getQuizQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    const quizId = Number(req.params.id);
    if (!Number.isFinite(quizId)) return res.status(400).json({ success: false, error: 'Invalid quiz id' });

    const quiz = db.prepare('SELECT id, name FROM quizzes WHERE id = ?').get(quizId) as { id: number; name: string } | undefined;
    if (!quiz) return res.status(404).json({ success: false, error: 'Quiz not found' });

    const questions = db.prepare('SELECT id, text FROM questions WHERE quiz_id = ? ORDER BY id').all(quizId) as { id: number; text: string }[];
    const optionsStmt = db.prepare('SELECT id, text FROM options WHERE question_id = ? ORDER BY id');
    const payload: QuizPayload = {
      id: quiz.id,
      name: quiz.name,
      questions: questions.map(q => ({ id: q.id, text: q.text, options: (optionsStmt.all(q.id) as { id: number; text: string }[]) }))
    };
    res.json({ success: true, data: payload });
  } catch (err) {
    next(err);
  }
}

function optionIdToLetter(index: number): AnswerLetter {
  return (['A', 'B', 'C', 'D'] as const)[index];
}

function letterToIndex(letter: AnswerLetter): number {
  return { A: 0, B: 1, C: 2, D: 3 }[letter];
}

export function submitQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const quizId = Number(req.params.id);
    if (!Number.isFinite(quizId)) return res.status(400).json({ success: false, error: 'Invalid quiz id' });

    const parsed = SubmitQuizSchema.parse(req.body);
    const answersRecord = parsed.answers; // questionId(string) -> letter
    const timeTaken = parsed.timeTakenSeconds;

    const questions = db.prepare('SELECT id, text FROM questions WHERE quiz_id = ? ORDER BY id').all(quizId) as { id: number; text: string }[];
    if (questions.length === 0) return res.status(404).json({ success: false, error: 'Quiz not found or empty' });

    const optsStmt = db.prepare('SELECT id, text, is_correct FROM options WHERE question_id = ? ORDER BY id');

    let score = 0;
    const detailed = questions.map((q) => {
      const options = optsStmt.all(q.id) as { id: number; text: string; is_correct: number }[];

      // Guard against malformed data
      if (options.length !== 4) {
        const safe = { A: '', B: '', C: '', D: '' } as const;
        return {
          questionId: q.id,
          questionText: q.text,
          options: safe,
          userAnswer: null,
          correctAnswer: 'A' as AnswerLetter,
          isCorrect: false
        };
      }

      const letterOptions = { A: options[0].text, B: options[1].text, C: options[2].text, D: options[3].text } as const;
      const correctIndex = options.findIndex(o => o.is_correct === 1);
      const correctLetter = optionIdToLetter(Math.max(0, correctIndex));
      const raw = answersRecord[String(q.id)] ?? null;
      const userLetter = (raw && AnswerLetterSchema.safeParse(raw).success ? (raw as AnswerLetter) : null);
      const isCorrect = userLetter === correctLetter;
      if (isCorrect) score += 1;
      return {
        questionId: q.id,
        questionText: q.text,
        options: letterOptions,
        userAnswer: userLetter,
        correctAnswer: correctLetter,
        isCorrect
      };
    });

    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const result: SubmitResult = { score, totalQuestions: total, percentage, timeTaken, results: detailed };
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}



