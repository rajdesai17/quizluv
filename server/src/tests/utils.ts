import request from 'supertest';
import app from '../server';

export const api = () => request(app);

export async function getQuizQuestions(quizId = 1) {
  const res = await api().get(`/api/quizzes/${quizId}/questions`);
  return res;
}

export async function submitQuiz(
  quizId: number,
  payload: { answers: Record<string, 'A' | 'B' | 'C' | 'D'>; timeTakenSeconds: number }
) {
  const res = await api()
    .post(`/api/quizzes/${quizId}/submit`)
    .set('Content-Type', 'application/json')
    .send(payload);
  return res;
}


