import { QuizData } from '../types/quiz';

export const quizData: Record<string, QuizData> = {
  Math: {
    category: 'Math',
    questions: [
      {
        id: 1,
        question: 'If the area of a square is 64 square units, what is the length of one of its sides?',
        options: ['8 Units', '12 Units', '4 Units', '16 Units'],
        correctAnswer: 0,
        explanation: 'The area of a square is side², so if area = 64, then side = √64 = 8 units.'
      },
      {
        id: 2,
        question: 'What is the result of 15 × 8?',
        options: ['120', '130', '125', '115'],
        correctAnswer: 0
      },
      {
        id: 3,
        question: 'What is 25% of 200?',
        options: ['40', '50', '60', '45'],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'If a triangle has angles of 60° and 70°, what is the third angle?',
        options: ['50°', '45°', '55°', '40°'],
        correctAnswer: 0
      }
    ]
  },
  Science: {
    category: 'Science',
    questions: [
      {
        id: 1,
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'NaCl', 'O2'],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is the speed of light in vacuum?',
        options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '200,000 km/s'],
        correctAnswer: 0
      }
    ]
  },
  Animals: {
    category: 'Animals',
    questions: [
      {
        id: 1,
        question: 'Which animal is known as the King of the Jungle?',
        options: ['Tiger', 'Lion', 'Elephant', 'Leopard'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is the largest mammal in the world?',
        options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 1
      }
    ]
  },
  Geography: {
    category: 'Geography',
    questions: [
      {
        id: 1,
        question: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        correctAnswer: 2
      },
      {
        id: 2,
        question: 'Which is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'],
        correctAnswer: 1
      }
    ]
  }
};