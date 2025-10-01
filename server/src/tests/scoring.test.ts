import { getQuizQuestions, submitQuiz } from './utils';

describe('POST /api/quizzes/:id/submit - scoring', () => {
  it('calculates score for a set of answers (first three ABB)', async () => {
    const getRes = await getQuizQuestions(1);
    const questions: Array<{ id: number }> = getRes.body.data.questions;

    const answers: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
    answers[String(questions[0].id)] = 'A';
    answers[String(questions[1].id)] = 'B';
    answers[String(questions[2].id)] = 'B';

    const submitRes = await submitQuiz(1, { answers, timeTakenSeconds: 25 });

    expect(submitRes.status).toBe(200);
    expect(submitRes.body.success).toBe(true);
    expect(submitRes.body.data.totalQuestions).toBe(10);
    expect(submitRes.body.data.score).toBeGreaterThanOrEqual(2);
    expect(submitRes.body.data.results).toHaveLength(10);
  });
});


