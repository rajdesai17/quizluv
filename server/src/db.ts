import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Ensure environment variables are available even when running scripts directly
dotenv.config();

const defaultDir = path.join(__dirname, '..', 'data');
const defaultFile = path.join(defaultDir, 'quiz.db');

// Resolve DB path from env or fall back to default inside server/data
const envDbPath = process.env.DB_PATH;
const dbPath = (() => {
  if (!envDbPath || envDbPath.trim().length === 0) return defaultFile;
  // If provided path is absolute use as-is, otherwise resolve relative to project root of server
  return path.isAbsolute(envDbPath)
    ? envDbPath
    : path.join(__dirname, '..', envDbPath);
})();

const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(dbPath);

export function withTransaction<T>(fn: () => T): T {
  const transaction = db.transaction(fn);
  return transaction();
}

