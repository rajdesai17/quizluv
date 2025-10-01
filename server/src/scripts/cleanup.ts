import { db } from '../db';

function cleanup() {
  // Remove invalid quizzes with empty names
  db.prepare("DELETE FROM quizzes WHERE name IS NULL OR TRIM(name) = ''").run();

  // Remove questions with null/empty text or invalid quiz reference
  db.prepare(
    `DELETE FROM questions
     WHERE text IS NULL OR TRIM(text) = ''
        OR quiz_id NOT IN (SELECT id FROM quizzes)`
  ).run();

  // Remove options with null/empty text or invalid question reference
  db.prepare(
    `DELETE FROM options
     WHERE text IS NULL OR TRIM(text) = ''
        OR question_id NOT IN (SELECT id FROM questions)`
  ).run();

  // Ensure is_correct is 0/1 only
  db.prepare(`UPDATE options SET is_correct = 0 WHERE is_correct NOT IN (0,1)`).run();

  console.log('Database cleanup completed.');
}

cleanup();


