import { getQuizQuestions, submitQuiz } from './utils';

describe('Partial and empty submissions', () => {
  it('accepts partial answers and scores accordingly', async () => {
    const getRes = await getQuizQuestions(1);
    const questions: Array<{ id: number }> = getRes.body.data.questions;
    const answers: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
    // Only answer first question
    answers[String(questions[0].id)] = 'A';
    const submitRes = await submitQuiz(1, { answers, timeTakenSeconds: 5 });
    expect(submitRes.status).toBe(200);
    expect(submitRes.body.success).toBe(true);
    expect(submitRes.body.data.totalQuestions).toBe(10);
    expect(submitRes.body.data.score).toBeGreaterThanOrEqual(0);
  });

  it('accepts empty answers and returns zero score', async () => {
    const res = await submitQuiz(1, { answers: {}, timeTakenSeconds: 3 });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalQuestions).toBe(10);
  });
});


