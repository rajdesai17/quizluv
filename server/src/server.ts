import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { quizRouter } from './routes/quiz.routes';

dotenv.config();
const app = express();

const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// Mount versioned API
app.use('/api/quizzes', quizRouter);

// Error handler (last)
app.use(errorHandler);

export default app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = Number(process.env.PORT || 4000);
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}


