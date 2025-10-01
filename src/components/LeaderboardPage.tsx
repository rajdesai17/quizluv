import React, { useMemo } from 'react';
import { LeaderboardEntry } from '../types/quiz';

const STORAGE_KEY = 'quizluv_leaderboard';

const LeaderboardPage: React.FC = () => {
  const entries = useMemo<LeaderboardEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
      return [...list].sort((a, b) => b.score - a.score);
    } catch {
      return [];
    }
  }, []);

  return (
    <div className="pt-6 animate-fadeIn">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-500 border-b">
            <div className="col-span-1">#</div>
            <div className="col-span-6">Player</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-2 text-right">Score</div>
          </div>
          {entries.length === 0 ? (
            <div className="p-6 text-sm text-gray-600">No scores yet. Play a quiz to appear here!</div>
          ) : (
            <ul>
              {entries.map((e, idx) => (
                <li key={`${e.name}-${e.category}-${e.score}-${idx}`} className="grid grid-cols-12 items-center px-4 py-3 border-t text-sm">
                  <div className="col-span-1 font-semibold text-gray-700">{idx + 1}</div>
                  <div className="col-span-6 text-gray-900">{e.name}</div>
                  <div className="col-span-3 text-gray-600">{e.category}</div>
                  <div className="col-span-2 text-right font-semibold text-gray-900">{e.score}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;


