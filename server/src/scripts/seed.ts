import { db, withTransaction } from '../db';

function seed() {
  return withTransaction(() => {
    // Clear data and reset autoincrement sequences for stable IDs in dev
    db.prepare('DELETE FROM options').run();
    db.prepare('DELETE FROM questions').run();
    db.prepare('DELETE FROM quizzes').run();
    db.prepare("DELETE FROM sqlite_sequence WHERE name IN ('options','questions','quizzes')").run();

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
      },
      {
        text: 'Which language is primarily used for styling web pages?',
        options: [
          { text: 'HTML', correct: 0 },
          { text: 'CSS', correct: 1 },
          { text: 'Python', correct: 0 },
          { text: 'C++', correct: 0 }
        ]
      },
      {
        text: 'What does HTTP stand for?',
        options: [
          { text: 'HyperText Transfer Protocol', correct: 1 },
          { text: 'HighText Transfer Protocol', correct: 0 },
          { text: 'Hyperlink Text Transfer Process', correct: 0 },
          { text: 'Hyper Transfer Text Protocol', correct: 0 }
        ]
      },
      {
        text: 'Who wrote "Romeo and Juliet"?',
        options: [
          { text: 'William Shakespeare', correct: 1 },
          { text: 'Charles Dickens', correct: 0 },
          { text: 'Jane Austen', correct: 0 },
          { text: 'Mark Twain', correct: 0 }
        ]
      },
      {
        text: 'What is the largest ocean on Earth?',
        options: [
          { text: 'Indian Ocean', correct: 0 },
          { text: 'Pacific Ocean', correct: 1 },
          { text: 'Atlantic Ocean', correct: 0 },
          { text: 'Arctic Ocean', correct: 0 }
        ]
      },
      {
        text: 'How many continents are there on Earth?',
        options: [
          { text: '6', correct: 0 },
          { text: '7', correct: 1 },
          { text: '5', correct: 0 },
          { text: '8', correct: 0 }
        ]
      },
      {
        text: 'Which gas do plants primarily absorb for photosynthesis?',
        options: [
          { text: 'Oxygen', correct: 0 },
          { text: 'Carbon Dioxide', correct: 1 },
          { text: 'Nitrogen', correct: 0 },
          { text: 'Hydrogen', correct: 0 }
        ]
      },
      {
        text: 'What is the square root of 144?',
        options: [
          { text: '10', correct: 0 },
          { text: '12', correct: 1 },
          { text: '11', correct: 0 },
          { text: '13', correct: 0 }
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

