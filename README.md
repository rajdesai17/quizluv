# QuizLuv

A modern, full-stack quiz application built with React, TypeScript, and Node.js. Users can take quizzes, view their scores, and compete on the leaderboard.

## ✨ Features

- **Interactive Quiz Interface**: Clean, responsive UI with smooth animations
- **Real-time Timer**: Countdown timer for each quiz session
- **Detailed Results**: Shows correct/incorrect answers with explanations
- **Leaderboard System**: Track high scores locally and on server
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Type Safety**: Full TypeScript implementation for better development experience

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **SQLite** with better-sqlite3
- **Zod** for request validation
- **CORS** for cross-origin requests

### Testing
- **Jest** for unit testing
- **Supertest** for API testing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd quizluv
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd server
npm install
```

#### Frontend Setup
```bash
cd ..
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

The `.env` file should contain:
```env
PORT=4000
CORS_ORIGIN=http://localhost:5173
DB_PATH=./data/quiz.db
```

### 4. Database Setup

Initialize the database with sample data:

```bash
cd server
npm run setup
```

This command will:
- Create the database tables
- Seed the database with sample quiz questions

## 🏃‍♂️ Running the Application

### Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:4000`

### Start the Frontend Development Server

In a new terminal:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to `http://localhost:5173`

## 🧪 Testing

### Backend Tests

Run the test suite:

```bash
cd server
npm run test
```

Run tests in watch mode:

```bash
cd server
npm run test:watch
```

### Test Coverage

The tests cover:
- Quiz question fetching
- Answer submission and scoring
- Input validation
- Error handling
- Database operations

## 📁 Project Structure

```
quizluv/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── Header.tsx
│   │   ├── LeaderboardPage.tsx
│   │   ├── NameModal.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   └── WelcomeScreen.tsx
│   ├── api/                      # API client
│   ├── types/                    # TypeScript type definitions
│   └── main.tsx
├── server/                       # Backend source code
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   ├── middleware/           # Express middleware
│   │   ├── routes/               # API routes
│   │   ├── scripts/              # Database scripts
│   │   ├── tests/                # Test files
│   │   └── types/                # TypeScript types
│   └── data/                     # Database files
├── requirements/                 # Project requirements
└── README.md
```

## 🔌 API Endpoints

### Quiz Endpoints

- `GET /api/quizzes/:id/questions` - Fetch quiz questions
- `POST /api/quizzes/:id/submit` - Submit quiz answers

### Leaderboard Endpoints

- `GET /api/quizzes/leaderboard` - Get leaderboard entries
- `POST /api/quizzes/leaderboard` - Add new leaderboard entry

## 🎯 Design Decisions

### Frontend Architecture
- **Component-based structure** for reusability and maintainability
- **Context-free state management** using React hooks for simplicity
- **Responsive design** with Tailwind CSS for consistent styling
- **TypeScript** for type safety and better developer experience

### Backend Architecture
- **RESTful API design** for clear separation of concerns
- **SQLite database** for lightweight, file-based storage
- **Zod validation** for robust input validation
- **Modular structure** with separate controllers, routes, and middleware

### Database Design
- **Normalized schema** with separate tables for quizzes, questions, and options
- **Foreign key constraints** for data integrity
- **Leaderboard table** for tracking high scores

### Testing Strategy
- **Unit tests** for core business logic
- **Integration tests** for API endpoints
- **Isolated test database** to prevent data contamination
