import React, { useState, useCallback, useEffect } from 'react';
import { Play, Square, Music, Check, X } from 'lucide-react';
import { playSound } from '../services/SoundService';

interface SoundGameProps {
  soundEnabled: boolean;
}

const NOTES = ['ready', 'click', 'result'] as const;
const SEQUENCE_LENGTH = 4;

const SoundGame: React.FC<SoundGameProps> = ({ soundEnabled }) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'success' | 'failed'>('idle');
  const [score, setScore] = useState(0);

  const generateSequence = useCallback(() => {
    return Array.from({ length: SEQUENCE_LENGTH }, () => 
      NOTES[Math.floor(Math.random() * NOTES.length)]
    );
  }, []);

  const playSequence = useCallback(async (sequence: string[]) => {
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (soundEnabled) {
        playSound(sequence[i] as any);
      }
    }
  }, [soundEnabled]);

  const startGame = useCallback(async () => {
    if (!soundEnabled) return;
    
    setGameState('playing');
    setPlayerSequence([]);
    const newSequence = generateSequence();
    setSequence(newSequence);
    setIsPlaying(true);
    
    await playSequence(newSequence);
    setIsPlaying(false);
  }, [generateSequence, playSequence, soundEnabled]);

  const handleNoteClick = useCallback((note: string) => {
    if (isPlaying || !soundEnabled || gameState !== 'playing') return;

    playSound(note as any);
    setPlayerSequence(prev => {
      const newSequence = [...prev, note];
      
      // Check if the new sequence matches so far
      for (let i = 0; i < newSequence.length; i++) {
        if (newSequence[i] !== sequence[i]) {
          setGameState('failed');
          return newSequence;
        }
      }
      
      // Check if sequence is complete and correct
      if (newSequence.length === sequence.length) {
        setGameState('success');
        setScore(prev => prev + 1);
      }
      
      return newSequence;
    });
  }, [isPlaying, sequence, soundEnabled, gameState]);

  useEffect(() => {
    if (gameState === 'success' || gameState === 'failed') {
      const timer = setTimeout(() => {
        setGameState('idle');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Music className="mr-2 text-blue-400" />
          Sound Pattern Game
        </h2>
        <div className="text-sm text-gray-400">Score: {score}</div>
      </div>

      {!soundEnabled && (
        <div className="text-center text-yellow-400 bg-yellow-400/10 p-3 rounded-lg">
          Please enable sound to play this game
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {NOTES.map((note) => (
          <button
            key={note}
            onClick={() => handleNoteClick(note)}
            disabled={isPlaying || !soundEnabled || gameState !== 'playing'}
            className={`
              p-4 rounded-lg font-medium transition-all
              ${isPlaying || !soundEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
              ${note === 'ready' ? 'bg-blue-500/20 text-blue-400' : 
                note === 'click' ? 'bg-green-500/20 text-green-400' : 
                'bg-purple-500/20 text-purple-400'}
            `}
          >
            {note}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={startGame}
          disabled={isPlaying || !soundEnabled}
          className={`
            px-6 py-2 rounded-lg font-medium flex items-center space-x-2
            ${isPlaying || !soundEnabled ? 
              'bg-gray-700 text-gray-400 cursor-not-allowed' : 
              'bg-blue-600 text-white hover:bg-blue-700'}
          `}
        >
          {isPlaying ? (
            <Square className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span>{isPlaying ? 'Playing...' : 'Play Pattern'}</span>
        </button>
      </div>

      {gameState === 'success' && (
        <div className="flex items-center justify-center space-x-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
          <Check className="w-5 h-5" />
          <span>Correct Pattern!</span>
        </div>
      )}

      {gameState === 'failed' && (
        <div className="flex items-center justify-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
          <X className="w-5 h-5" />
          <span>Wrong Pattern!</span>
        </div>
      )}
    </div>
  );
};

export default SoundGame;