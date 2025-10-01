import { api, submitQuiz } from './utils';

describe('404 for non-existent quiz', () => {
  it('GET returns 404', async () => {
    const res = await api().get('/api/quizzes/9999/questions');
    expect(res.status).toBe(404);
  });

  it('POST returns 404', async () => {
    const res = await submitQuiz(9999, { answers: {}, timeTakenSeconds: 0 });
    expect(res.status).toBe(404);
  });
});


