import { Router } from 'express';
import { getQuizQuestions, submitQuiz } from '../controllers/quiz.controller';

export const quizRouter = Router();

quizRouter.get('/:id/questions', getQuizQuestions);
quizRouter.post('/:id/submit', submitQuiz);



