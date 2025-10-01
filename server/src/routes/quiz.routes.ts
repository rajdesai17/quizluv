import { Router } from 'express';
import { getQuizQuestions, submitQuiz } from '../controllers/quiz.controller';
import { db } from '../db';
import { z } from 'zod';

export const quizRouter = Router();

quizRouter.get('/:id/questions', getQuizQuestions);
quizRouter.post('/:id/submit', submitQuiz);

// Leaderboard APIs
const LeaderboardEntrySchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  score: z.number().int().min(0),
  time: z.number().int().min(0)
});

quizRouter.get('/leaderboard', (req, res, next) => {
  try {
    const rows = db.prepare('SELECT name, category, score, time_seconds as time, created_at FROM leaderboard ORDER BY score DESC, time_seconds ASC, created_at ASC LIMIT 100').all();
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
});

quizRouter.post('/leaderboard', (req, res, next) => {
  try {
    const parsed = LeaderboardEntrySchema.parse(req.body);
    db.prepare('INSERT INTO leaderboard (name, category, score, time_seconds) VALUES (?, ?, ?, ?)')
      .run(parsed.name, parsed.category, parsed.score, parsed.time);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});



