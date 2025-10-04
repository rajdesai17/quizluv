import { getQuizQuestions, submitQuiz } from './utils';

describe('POST /api/quizzes/:id/submit - scoring', () => {
  it('calculates score for correct answers', async () => {
    const getRes = await getQuizQuestions(1);
    const questions: Array<{ id: number; options: Array<{ id: number; text: string }> }> = getRes.body.data.questions;

    // Find correct answers by checking option text against known correct answers
    const correctAnswers = [
      'Paris',           // Q1: What is the capital of France?
      'Mars',            // Q2: Which planet is known as the Red Planet?
      '50',              // Q3: What is 25% of 200?
      'CSS',             // Q4: Which language is primarily used for styling web pages?
      'HyperText Transfer Protocol', // Q5: What does HTTP stand for?
      'William Shakespeare', // Q6: Who wrote "Romeo and Juliet"?
      'Pacific Ocean',   // Q7: What is the largest ocean on Earth?
      '7',               // Q8: How many continents are there on Earth?
      'Carbon Dioxide',  // Q9: Which gas do plants primarily absorb for photosynthesis?
      '12'               // Q10: What is the square root of 144?
    ];

    const answers: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
    
    // Find correct answer for first 3 questions
    for (let i = 0; i < Math.min(3, questions.length); i++) {
      const question = questions[i];
      const correctText = correctAnswers[i];
      
      // Find the option with the correct text
      const correctOptionIndex = question.options.findIndex(opt => opt.text === correctText);
      if (correctOptionIndex >= 0) {
        const letter = ['A', 'B', 'C', 'D'][correctOptionIndex] as 'A' | 'B' | 'C' | 'D';
        answers[String(question.id)] = letter;
      }
    }

    const submitRes = await submitQuiz(1, { answers, timeTakenSeconds: 25 });

    expect(submitRes.status).toBe(200);
    expect(submitRes.body.success).toBe(true);
    expect(submitRes.body.data.totalQuestions).toBe(10);
    expect(submitRes.body.data.score).toBe(3); // Should get exactly 3 correct
    expect(submitRes.body.data.results).toHaveLength(10);
  });

  it('calculates score for mixed correct and incorrect answers', async () => {
    const getRes = await getQuizQuestions(1);
    const questions: Array<{ id: number; options: Array<{ id: number; text: string }> }> = getRes.body.data.questions;

    const answers: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
    
    // Answer first question correctly, second incorrectly, third correctly
    if (questions.length >= 3) {
      // Find correct answer for first question
      const correctText1 = 'Paris';
      const correctOptionIndex1 = questions[0].options.findIndex(opt => opt.text === correctText1);
      if (correctOptionIndex1 >= 0) {
        const letter1 = ['A', 'B', 'C', 'D'][correctOptionIndex1] as 'A' | 'B' | 'C' | 'D';
        answers[String(questions[0].id)] = letter1;
      }

      // Answer second question incorrectly (choose first option that's not Mars)
      const wrongOptionIndex2 = questions[1].options.findIndex(opt => opt.text !== 'Mars');
      if (wrongOptionIndex2 >= 0) {
        const letter2 = ['A', 'B', 'C', 'D'][wrongOptionIndex2] as 'A' | 'B' | 'C' | 'D';
        answers[String(questions[1].id)] = letter2;
      }

      // Find correct answer for third question
      const correctText3 = '50';
      const correctOptionIndex3 = questions[2].options.findIndex(opt => opt.text === correctText3);
      if (correctOptionIndex3 >= 0) {
        const letter3 = ['A', 'B', 'C', 'D'][correctOptionIndex3] as 'A' | 'B' | 'C' | 'D';
        answers[String(questions[2].id)] = letter3;
      }
    }

    const submitRes = await submitQuiz(1, { answers, timeTakenSeconds: 25 });

    expect(submitRes.status).toBe(200);
    expect(submitRes.body.success).toBe(true);
    expect(submitRes.body.data.totalQuestions).toBe(10);
    expect(submitRes.body.data.score).toBe(2); // Should get exactly 2 correct out of 3 answered
    expect(submitRes.body.data.results).toHaveLength(10);
  });
});


