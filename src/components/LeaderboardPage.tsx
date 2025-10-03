import React, { useEffect, useMemo, useState } from 'react';
import { getLeaderboard } from '../api/client';
import { LeaderboardEntry } from '../types/quiz';

const STORAGE_KEY = 'quizluv_leaderboard';

const LeaderboardPage: React.FC = () => {
  const [serverEntries, setServerEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    getLeaderboard().then((rows) => {
      const sanitized = rows.filter(e => Number.isFinite(e.score) && Number.isFinite(e.time));
      setServerEntries(sanitized);
    }).catch(() => {});
  }, []);

  const entries = useMemo<LeaderboardEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
      const sanitized = list.filter(e => {
        const validScore = Number.isFinite(e.score);
        const validTime = Number.isFinite(e.time);
        const hasName = typeof e.name === 'string' && e.name.trim().length > 0;
        const hasCat = typeof e.category === 'string' && e.category.trim().length > 0;
        return validScore && validTime && hasName && hasCat;
      });
      // Merge server and local, deduplicate, and then sort
      const merged = [...serverEntries, ...sanitized];
      const deduplicated = merged.filter((entry, index, arr) => {
        // Find first occurrence of this name+category+score+time combination
        const firstIndex = arr.findIndex(e => 
          e.name === entry.name && 
          e.category === entry.category && 
          e.score === entry.score && 
          e.time === entry.time
        );
        return index === firstIndex;
      });
      return deduplicated.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time - b.time; // lower time ranks higher when same score
      });
    } catch {
      return serverEntries;
    }
  }, [serverEntries]);

  return (
    <div className="pt-6 animate-fadeIn">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-500 border-b">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-2 text-right">Score</div>
            <div className="col-span-1 text-right">Time</div>
          </div>
          {entries.length === 0 ? (
            <div className="p-6 text-sm text-gray-600">No scores yet. Play a quiz to appear here!</div>
          ) : (
            <ul>
              {entries.map((e, idx) => (
                <li key={`${e.name}-${e.category}-${e.score}-${e.time}-${idx}`} className="grid grid-cols-12 items-center px-4 py-3 border-t text-sm">
                  <div className="col-span-1 font-semibold text-gray-700">{idx + 1}</div>
                  <div className="col-span-5 text-gray-900">{e.name}</div>
                  <div className="col-span-3 text-gray-600">{e.category}</div>
                  <div className="col-span-2 text-right font-semibold text-gray-900">{e.score}</div>
                  <div className="col-span-1 text-right text-gray-600">{Math.floor(e.time / 60)}:{String(e.time % 60).padStart(2, '0')}</div>
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


