import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { quizRouter } from './routes/quiz.routes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Mount versioned API
app.use('/api/quizzes', quizRouter);

// Error handler (last)
app.use(errorHandler);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});


