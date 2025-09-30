🏗️ Technical Implementation Specifications
Backend Structure
Technology Stack:
json{
  "runtime": "Node.js 18+",
  "language": "TypeScript 5.0+",
  "framework": "Express.js 4.18+",
  "database": "SQLite with better-sqlite3",
  "validation": "Zod",
  "testing": "Jest + Supertest",
  "devTools": ["ts-node-dev", "eslint", "prettier"]
}
Project Structure:
backend/
├── src/
│   ├── controllers/
│   │   └── quiz.controller.ts       # Request handlers
│   ├── services/
│   │   ├── quiz.service.ts          # Business logic
│   │   └── scoring.service.ts       # Score calculation
│   ├── db/
│   │   ├── database.ts              # DB connection
│   │   ├── schema.sql               # Table definitions
│   │   └── seed.ts                  # Sample data
│   ├── middleware/
│   │   ├── errorHandler.ts          # Global error handler
│   │   └── validation.ts            # Request validation
│   ├── routes/
│   │   └── quiz.routes.ts           # API routes
│   ├── types/
│   │   └── quiz.types.ts            # TypeScript interfaces
│   ├── utils/
│   │   └── response.ts              # Response formatters
│   └── server.ts                    # App entry point
├── tests/
│   ├── unit/
│   │   └── scoring.test.ts
│   └── integration/
│       └── quiz.test.ts
├── package.json
├── tsconfig.json
└── .env.example
Database Schema (SQLite):
sql-- quizzes table
CREATE TABLE quizzes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  time_limit_minutes INTEGER DEFAULT 10,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- questions table
CREATE TABLE questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quiz_id INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option TEXT NOT NULL CHECK(correct_option IN ('A', 'B', 'C', 'D')),
  order_index INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

CREATE INDEX idx_quiz_questions ON questions(quiz_id);
API Endpoints:
1. Get Quiz Questions
typescriptGET /api/quizzes/:quizId/questions

Response 200:
{
  success: true,
  data: {
    quizId: 1,
    title: "Math Quiz",
    description: "Test your math knowledge",
    timeLimitMinutes: 10,
    questionCount: 20,
    questions: [
      {
        id: 1,
        questionText: "What is 2 + 2?",
        options: {
          A: "3",
          B: "4",
          C: "5",
          D: "6"
        }
      }
      // ... more questions
    ]
  }
}

Response 404:
{
  success: false,
  error: "Quiz not found"
}
2. Submit Quiz
typescriptPOST /api/quizzes/:quizId/submit

Request Body:
{
  answers: {
    "1": "B",    // questionId: selectedOption
    "2": "A",
    "3": "C"
    // ... all answers
  },
  timeTakenSeconds: 324
}

Response 200:
{
  success: true,
  data: {
    score: 15,
    totalQuestions: 20,
    percentage: 75,
    timeTaken: 324,
    results: [
      {
        questionId: 1,
        questionText: "What is 2 + 2?",
        options: {
          A: "3",
          B: "4",
          C: "5",
          D: "6"
        },
        userAnswer: "B",
        correctAnswer: "B",
        isCorrect: true
      },
      {
        questionId: 2,
        questionText: "Capital of France?",
        options: {
          A: "Paris",
          B: "Berlin",
          C: "Madrid",
          D: "Rome"
        },
        userAnswer: "B",
        correctAnswer: "A",
        isCorrect: false
      }
      // ... all questions with results
    ]
  }
}

Response 400:
{
  success: false,
  error: "Invalid answer format",
  details: [...]
}
Validation Schemas (Zod):
typescript// src/types/quiz.types.ts
import { z } from 'zod';

export const AnswerSchema = z.enum(['A', 'B', 'C', 'D']);

export const SubmitQuizSchema = z.object({
  answers: z.record(
    z.string().regex(/^\d+$/), // questionId as string
    AnswerSchema
  ),
  timeTakenSeconds: z.number().int().min(0)
});

export type SubmitQuizRequest = z.infer<typeof SubmitQuizSchema>;
Error Handling:
typescript// src/middleware/errorHandler.ts
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: err.errors
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};

Frontend Structure
Technology Stack:
json{
  "framework": "React 18.2+",
  "language": "TypeScript 5.0+",
  "buildTool": "Vite 4.0+",
  "styling": "Tailwind CSS 3.3+",
  "routing": "React Router 6.10+",
  "httpClient": "fetch API",
  "devTools": ["eslint", "prettier"]
}
Project Structure:
frontend/
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.tsx
│   │   ├── QuizInterface.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── OptionButton.tsx
│   │   ├── NavigationControls.tsx
│   │   ├── Timer.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ResultsScreen.tsx
│   │   ├── ResultCard.tsx
│   │   └── ConfirmModal.tsx
│   ├── context/
│   │   └── QuizContext.tsx
│   ├── hooks/
│   │   ├── useQuiz.ts
│   │   ├── useTimer.ts
│   │   └── useQuizNavigation.ts
│   ├── services/
│   │   └── api.service.ts
│   ├── types/
│   │   └── quiz.types.ts
│   ├── utils/
│   │   ├── storage.ts
│   │   └── formatters.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── .env.example
State Management (Context + Reducer):
typescript// src/context/QuizContext.tsx
interface QuizState {
  quiz: Quiz | null;
  currentQuestionIndex: number;
  answers: Record<number, Answer>;
  timeRemaining: number;
  isSubmitting: boolean;
  results: QuizResults | null;
  status: 'idle' | 'loading' | 'ready' | 'in-progress' | 'completed' | 'error';
}

type QuizAction =
  | { type: 'LOAD_QUIZ_START' }
  | { type: 'LOAD_QUIZ_SUCCESS'; payload: Quiz }
  | { type: 'LOAD_QUIZ_ERROR'; payload: string }
  | { type: 'START_QUIZ' }
  | { type: 'SET_ANSWER'; payload: { questionId: number; answer: Answer } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'GO_TO_QUESTION'; payload: number }
  | { type: 'TICK_TIMER' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS'; payload: QuizResults }
  | { type: 'SUBMIT_ERROR'; payload: string }
  | { type: 'RESET_QUIZ' };

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer
        }
      };
    
    case 'TICK_TIMER':
      const newTime = state.timeRemaining - 1;
      if (newTime === 0) {
        // Auto-submit when timer reaches zero
        return { ...state, timeRemaining: 0, status: 'submitting' };
      }
      return { ...state, timeRemaining: newTime };
    
    // ... other cases
    default:
      return state;
  }
};
Custom Hooks:
typescript// src/hooks/useTimer.ts
export const useTimer = (initialSeconds: number, onComplete: () => void) => {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isRunning,
    start: () => setIsRunning(true),
    pause: () => setIsRunning(false),
    reset: () => {
      setTimeRemaining(initialSeconds);
      setIsRunning(false);
    }
  };
};
API Service:
typescript// src/services/api.service.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const quizApi = {
  async getQuiz(quizId: number): Promise<Quiz> {
    const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}/questions`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch quiz');
    }
    
    const data = await response.json();
    return data.data;
  },

  async submitQuiz(
    quizId: number,
    answers: Record<number, Answer>,
    timeTakenSeconds: number
  ): Promise<QuizResults> {
    const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers, timeTakenSeconds }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit quiz');
    }

    const data = await response.json();
    return data.data;
  }
};
Component Examples:
typescript// src/components/OptionButton.tsx
interface OptionButtonProps {
  option: Answer;
  text: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (option: Answer) => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  text,
  isSelected,
  isDisabled,
  onSelect
}) => {
  return (
    <button
      onClick={() => onSelect(option)}
      disabled={isDisabled}
      className={`
        w-full px-6 py-4 rounded-xl text-left text-white font-medium
        transition-all duration-200 flex items-center justify-between
        ${isSelected 
          ? 'bg-emerald-500 scale-[0.98]' 
          : 'bg-orange-400 hover:bg-orange-500 active:scale-95'
        }
        ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span>{option}) {text}</span>
      {isSelected && <span className="text-xl">✓</span>}
    </button>
  );
};

🧪 Testing Requirements
Backend Tests (Jest + Supertest)
typescript// tests/unit/scoring.test.ts
describe('Scoring Service', () => {
  test('should calculate correct score for all correct answers', () => {
    const questions = [
      { id: 1, correctAnswer: 'A' },
      { id: 2, correctAnswer: 'B' },
    ];
    const answers = { 1: 'A', 2: 'B' };
    
    const result = calculateScore(questions, answers);
    
    expect(result.score).toBe(2);
    expect(result.percentage).toBe(100);
  });

  test('should handle missing answers as incorrect', () => {
    const questions = [
      { id: 1, correctAnswer: 'A' },
      { id: 2, correctAnswer: 'B' },
    ];
    const answers = { 1: 'A' }; // Missing answer for question 2
    
    const result = calculateScore(questions, answers);
    
    expect(result.score).toBe(1);
    expect(result.percentage).toBe(50);
  });

  test('should return detailed results for each question', () => {
    const questions = [
      { id: 1, correctAnswer: 'A' },
      { id: 2, correctAnswer: 'B' },
    ];
    const answers = { 1: 'A', 2: 'C' };
    
    const result = calculateScore(questions, answers);
    
    expect(result.results).toHaveLength(2);
    expect(result.results[0].isCorrect).toBe(true);
    expect(result.results[1].isCorrect).toBe(false);
  });
});

// tests/integration/quiz.test.ts
describe('Quiz API', () => {
  test('GET /api/quizzes/:id/questions returns quiz without answers', async () => {
    const response = await request(app)
      .get('/api/quizzes/1/questions')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.questions).toBeDefined();
    expect(response.body.data.questions[0]).not.toHaveProperty('correctAnswer');
  });

  test('POST /api/quizzes/:id/submit calculates score correctly', async () => {
    const response = await request(app)
      .post('/api/quizzes/1/submit')
      .send({
        answers: { '1': 'A', '2': 'B' },
        timeTakenSeconds: 120
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('score');
    expect(response.body.data).toHaveProperty('results');
  });

  test('POST /api/quizzes/:id/submit validates input', async () => {
    const response = await request(app)
      .post('/api/quizzes/1/submit')
      .send({
        answers: { '1': 'Z' }, // Invalid option
        timeTakenSeconds: 120
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });
});
Test Coverage Target: Minimum 80% for backend services

📦 Sample Data (Seed File)
typescript// backend/src/db/seed.ts
export const seedData = {
  quiz: {
    title: "General Knowledge Quiz",
    description: "Test your general knowledge with 20 questions",
    timeLimitMinutes: 10
  },
  questions: [
    {
      questionText: "What is the capital of France?",
      optionA: "London",
      optionB: "Berlin",
      optionC: "Paris",
      optionD: "Madrid",
      correctOption: "C",
      orderIndex: 1
    },
    {
      questionText: "Which planet is known as the Red Planet?",
      optionA: "Venus",
      optionB: "Mars",
      optionC: "Jupiter",
      optionD: "Saturn",
      correctOption: "B",
      orderIndex: 2
    },
    {
      questionText: "Who painted the Mona Lisa?",
      optionA: "Vincent van Gogh",
      optionB: "Pablo Picasso",
      optionC: "Leonardo da Vinci",
      optionD: "Michelangelo",
      correctOption: "C",
      orderIndex: 3
    },
    {
      questionText: "What is the largest ocean on Earth?",
      optionA: "Pacific Ocean",
      optionB: "Atlantic Ocean",
      optionC: "Indian Ocean",
      optionD: "Arctic Ocean",
      correctOption: "A",
      orderIndex: 4
    },
    {
      questionText: "In which year did World War II end?",
      optionA: "1943",
      optionB: "1944",
      optionC: "1945",
      optionD: "1946",
      correctOption: "C",
      orderIndex: 5
    },
    {
      questionText: "What is the smallest prime number?",
      optionA: "0",
      optionB: "2",
      optionC: "1",
      optionD: "3",
      correctOption: "B",
      orderIndex: 6
    },
    {
      questionText: "Which element has the chemical symbol 'O'?",
      optionA: "Oxygen",
      optionB: "Gold",
      optionC: "Silver",
      optionD: "Osmium",
      correctOption: "A",
      orderIndex: 7
    },
    {
      questionText: "Who wrote 'Romeo and Juliet'?",
      optionA: "Charles Dickens",
      optionB: "Jane Austen",
      optionC: "William Shakespeare",
      optionD: "Mark Twain",
      correctOption: "C",
      orderIndex: 8
    },
    {
      questionText: "What is the speed of light in vacuum?",
      optionA: "300,000 km/s",
      optionB: "299,792 km/s",
      optionC: "250,000 km/s",
      optionD: "350,000 km/s",
      correctOption: "B",
      orderIndex: 9
    },
    {
      questionText: "Which country is home to the kangaroo?",
      optionA: "New Zealand",
      optionB: "South Africa",
      optionC: "Brazil",
      optionD: "Australia",
      correctOption: "D",
      orderIndex: 10
    },
    {
      questionText: "How many continents are there?",
      optionA: "5",
      optionB: "6",
      optionC: "7",
      optionD: "8",
      correctOption: "C",
      orderIndex: 11
    },
    {
      questionText: "What is the largest mammal in the world?",
      optionA: "African Elephant",
      optionB: "Blue Whale",
      optionC: "Giraffe",
      optionD: "Polar Bear",
      correctOption: "B",
      orderIndex: 12
    },
    {
      questionText: "Who developed the theory of relativity?",
      optionA: "Isaac Newton",
      optionB: "Albert Einstein",
      optionC: "Galileo Galilei",
      optionD: "Stephen Hawking",
      correctOption: "B",
      orderIndex: 13
    },
    {
      questionText: "What is the currency of Japan?",
      optionA: "Yuan",
      optionB: "Won",
      optionC: "Yen",
      optionD: "Rupee",
      correctOption: "C",
      orderIndex: 14
    },
    {
      questionText: "How many bones are in the adult human body?",
      optionA: "186",
      optionB: "206",
      optionC: "226",
      optionD: "246",
      correctOption: "B",
      orderIndex: 15
    },
    {
      questionText: "What is the boiling point of water at sea level?",
      optionA: "90°C",
      optionB: "100°C",
      optionC: "110°C",
      optionD: "120°C",
      correctOption: "B",
      orderIndex: 16
    },
    {
      questionText: "Which gas do plants absorb from the atmosphere?",
      optionA: "Oxygen",
      optionB: "Nitrogen",
      optionC: "Carbon Dioxide",
      optionD: "Hydrogen",
      correctOption: "C",
      orderIndex: 17
    },
    {
      questionText: "What is the tallest mountain in the world?",
      optionA: "K2",
      optionB: "KangchenjungaRetryClaude does not have the ability to run the code it generates yet.RContinueEdittypescript      optionC: "Mount Everest",
      optionD: "Lhotse",
      correctOption: "C",
      orderIndex: 18
    },
    {
      questionText: "In which year did the Titanic sink?",
      optionA: "1910",
      optionB: "1912",
      optionC: "1914",
      optionD: "1916",
      correctOption: "B",
      orderIndex: 19
    },
    {
      questionText: "What is the square root of 144?",
      optionA: "10",
      optionB: "11",
      optionC: "12",
      optionD: "13",
      correctOption: "C",
      orderIndex: 20
    }