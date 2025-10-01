import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Flag, Clock, BookOpen, Users } from 'lucide-react';
import { QuizData, QuizResult } from '../types/quiz';
import { submitQuiz, AnswerLetter } from '../api/client';

interface QuizScreenProps {
  quizData: QuizData;
  category: string;
  onFinish: (result: QuizResult) => void;
  onBack: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ quizData, category, onFinish, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId -> optionId
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(Date.now());
  const QUESTION_TIME_LIMIT = 10;
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);

  const question = quizData.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quizData.questions.length - 1;
  const progressPercentage = useMemo(() => ((currentQuestion + 1) / quizData.questions.length) * 100, [currentQuestion, quizData.questions.length]);

  // Reset and start timer whenever question changes
  useEffect(() => {
    setTimeLeft(QUESTION_TIME_LIMIT);

    if (submitting) return; // don't run timer while submitting

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, submitting]);

  const handleTimeout = () => {
    if (isLastQuestion) {
      if (!submitting) {
        void handleSubmit();
      }
    } else {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(QUESTION_TIME_LIMIT);
    }
  };

  const handleAnswerSelect = (optionId: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: optionId }));
  };

  const goNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(QUESTION_TIME_LIMIT);
    }
  };

  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setTimeLeft(QUESTION_TIME_LIMIT);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const answersLetters: Record<number, AnswerLetter> = {} as Record<number, AnswerLetter>;
      quizData.questions.forEach(q => {
        const optIndex = q.options.findIndex(o => o.id === answers[q.id]);
        if (optIndex >= 0 && optIndex <= 3) {
          answersLetters[q.id] = ['A','B','C','D'][optIndex] as AnswerLetter;
        }
      });
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const res = await submitQuiz(quizData.id, answersLetters, timeSpent);
      const result: QuizResult = {
        score: res.score,
        total: res.total,
        percentage: res.percentage,
        timeSpent,
        category,
        results: res.results
      };
      onFinish(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to submit quiz';
      alert(`Submission failed: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  // progressPercentage moved to useMemo for clarity

  return (
    <div className="pt-4 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Quiz Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
              {/* Quiz Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{category} Quiz</h1>
                    <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {quizData.questions.length}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="select-none">
                    <div
                      className={`flex items-center space-x-3 text-base font-bold px-4 py-2 rounded-full shadow-md transition-colors ${
                        timeLeft <= 3 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-blue-50 text-blue-700'
                      }`}
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <Clock className={`w-5 h-5 ${timeLeft <= 3 ? 'text-red-600' : 'text-blue-600'}`} />
                      <span className="tabular-nums">{timeLeft}s</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm" onClick={goNext} disabled={isLastQuestion || submitting} aria-disabled={isLastQuestion || submitting}>
                    Skip
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Progress: {Math.round(progressPercentage)}%
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentQuestion + 1}/{quizData.questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 leading-relaxed mb-4" id="question-text">
                  {question.text}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => {
                  const selected = answers[question.id] === option.id;
                  const buttonClass = selected
                    ? "w-full p-4 lg:p-5 text-left font-medium rounded-xl border-2 transition-all duration-200 bg-blue-50 border-blue-300"
                    : "w-full p-4 lg:p-5 text-left font-medium rounded-xl border-2 transition-all duration-200 bg-white border-gray-200 text-gray-800 hover:bg-blue-50 hover:border-blue-300 transform hover:scale-[1.02]";

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(option.id)}
                      className={buttonClass}
                      disabled={submitting}
                      aria-pressed={selected}
                      aria-describedby="question-text"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-gray-100 text-gray-600">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="text-base lg:text-lg">{option.text}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button className="flex items-center space-x-2 text-gray-500 text-sm hover:text-gray-700 transition-colors">
                  <Flag className="w-4 h-4" />
                  <span>Report Question</span>
                </button>
                
                <div className="flex items-center space-x-4">
                  <button onClick={goPrev} disabled={currentQuestion === 0 || submitting} aria-disabled={currentQuestion === 0 || submitting} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors disabled:opacity-50">
                    Previous
                  </button>
                  {isLastQuestion ? (
                    <button onClick={handleSubmit} disabled={submitting} aria-busy={submitting} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50">
                      {submitting ? (
                        <span className="inline-flex items-center"><span className="spinner mr-2" aria-hidden="true"></span>Submitting...</span>
                      ) : 'Submit'}
                    </button>
                  ) : (
                    <button onClick={goNext} disabled={submitting} aria-disabled={submitting} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quiz Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quiz Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{quizData.questions.length} Questions</div>
                    <div className="text-xs text-gray-500">Total questions</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">~5 minutes</div>
                    <div className="text-xs text-gray-500">Estimated time</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">1,234 taken</div>
                    <div className="text-xs text-gray-500">Times completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Question Progress</h3>
              <div className="grid grid-cols-5 gap-2">
                {quizData.questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                      index < currentQuestion
                        ? 'bg-green-500 text-white'
                        : index === currentQuestion
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Answered Count */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Progress</h3>
              <div className="text-3xl font-bold mb-1">{Object.keys(answers).length}/{quizData.questions.length}</div>
              <div className="text-sm opacity-90">
                Answered questions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;