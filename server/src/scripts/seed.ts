import { db, withTransaction } from '../db';

function seed() {
  return withTransaction(() => {
    const clearStmt = db.prepare('DELETE FROM options');
    clearStmt.run();
    db.prepare('DELETE FROM questions').run();
    db.prepare('DELETE FROM quizzes').run();

    const insertQuiz = db.prepare('INSERT INTO quizzes (name) VALUES (?)');
    const quizResult = insertQuiz.run('General Knowledge');
    const quizId = Number(quizResult.lastInsertRowid);

    const insertQuestion = db.prepare('INSERT INTO questions (quiz_id, text) VALUES (?, ?)');
    const insertOption = db.prepare('INSERT INTO options (question_id, text, is_correct) VALUES (?, ?, ?)');

    const questions = [
      {
        text: 'What is the capital of France?',
        options: [
          { text: 'Paris', correct: 1 },
          { text: 'London', correct: 0 },
          { text: 'Berlin', correct: 0 },
          { text: 'Madrid', correct: 0 }
        ]
      },
      {
        text: 'Which planet is known as the Red Planet?',
        options: [
          { text: 'Venus', correct: 0 },
          { text: 'Mars', correct: 1 },
          { text: 'Jupiter', correct: 0 },
          { text: 'Saturn', correct: 0 }
        ]
      },
      {
        text: 'What is 25% of 200?',
        options: [
          { text: '40', correct: 0 },
          { text: '50', correct: 1 },
          { text: '60', correct: 0 },
          { text: '45', correct: 0 }
        ]
      }
    ];

    for (const q of questions) {
      const qRes = insertQuestion.run(quizId, q.text);
      const questionId = Number(qRes.lastInsertRowid);
      for (const opt of q.options) {
        insertOption.run(questionId, opt.text, opt.correct ? 1 : 0);
      }
    }
  });
}

seed();
console.log('Seed completed.');

