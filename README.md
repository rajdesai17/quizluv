quizluv

Quick start

Backend (server)
- PowerShell:
  1. cd server
  2. npm i
  3. npm run setup
  4. npm run dev

Frontend (web)
- PowerShell:
  1. cd ..
  2. npm i
  3. npm run dev

Environment
- server/.env (copy from server/.env.example):
  - PORT=4000
  - CORS_ORIGIN=http://localhost:5173
  - DB_PATH=./data/quiz.db

Testing (backend)
- PowerShell:
  1. cd server
  2. npm run test
  3. npm run test:watch

Notes
- Tests use an isolated DB (./data/test.db) set by test setup.
