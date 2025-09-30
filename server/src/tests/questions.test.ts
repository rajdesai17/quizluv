import { db } from '../db';
import { getQuizQuestions } from './utils';

afterAll(() => {
  db.close();
});

describe('GET /api/quizzes/:id/questions', () => {
  it('returns quiz questions without revealing correct answers', async () => {
    const res = await getQuizQuestions(1);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    const { data } = res.body;
    expect(data).toBeDefined();
    expect(Array.isArray(data.questions)).toBe(true);
    const q = data.questions[0];
    expect(q).toHaveProperty('id');
    expect(q).toHaveProperty('text');
    expect(q).toHaveProperty('options');
    expect(Array.isArray(q.options)).toBe(true);
  });
});


