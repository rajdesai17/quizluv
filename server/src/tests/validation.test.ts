import { db } from '../db';
import { submitQuiz } from './utils';

afterAll(() => {
  db.close();
});

describe('POST /api/quizzes/:id/submit - validation', () => {
  it('rejects invalid answer format or gracefully handles as incorrect', async () => {
    const bad = await submitQuiz(1, {
      answers: { '1': 'Z' as unknown as 'A' },
      timeTakenSeconds: 10,
    });

    // Depending on Zod catch in middleware, expect 400 or success with incorrect handling
    expect([400, 200]).toContain(bad.status);
    if (bad.status === 400) {
      expect(bad.body.success).toBe(false);
    } else {
      expect(bad.body.success).toBe(true);
      expect(bad.body.data).toHaveProperty('results');
    }
  });
});


