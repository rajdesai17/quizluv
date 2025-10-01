import React, { useState } from 'react';

interface NameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

const NameModal: React.FC<NameModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Let’s get to know you</h3>
        <p className="text-sm text-gray-600 mb-4">Enter a fun nickname to show on the leaderboard.</p>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
          <button
            onClick={() => {
              const trimmed = name.trim();
              if (trimmed.length === 0) return;
              onConfirm(trimmed);
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameModal;


