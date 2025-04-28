import React from 'react';
import { Difficulty, TestSettings } from '../types';
import { Volume2, VolumeX } from 'lucide-react';

interface TestControlsProps {
  onStart: () => void;
  disabled: boolean;
  settings: TestSettings;
  onChangeDifficulty: (difficulty: Difficulty) => void;
  onToggleSound: () => void;
}

const TestControls: React.FC<TestControlsProps> = ({
  onStart,
  disabled,
  settings,
  onChangeDifficulty,
  onToggleSound
}) => {
  const difficultyOptions: Difficulty[] = ['easy', 'normal', 'hard'];

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto">
      <div className="flex justify-center">
        <button
          onClick={onStart}
          disabled={disabled}
          className={`px-8 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Start Test
        </button>
      </div>

      <div className="flex justify-between items-center bg-gray-800 rounded-lg p-4">
        <div className="flex space-x-2">
          {difficultyOptions.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => onChangeDifficulty(difficulty)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                settings.difficulty === difficulty
                  ? difficulty === 'easy'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : difficulty === 'normal'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={onToggleSound}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label={settings.soundEnabled ? 'Disable sound' : 'Enable sound'}
        >
          {settings.soundEnabled ? (
            <Volume2 size={20} className="text-blue-400" />
          ) : (
            <VolumeX size={20} className="text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TestControls;