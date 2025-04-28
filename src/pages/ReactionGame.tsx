import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactionTest from '../components/ReactionTest';
import TestControls from '../components/TestControls';
import Instructions from '../components/Instructions';
import { ReactionResult, TestSettings, TestState, Difficulty } from '../types';
import { saveResults, loadResults } from '../utils/testUtils';
import { XCircle } from 'lucide-react';

const ReactionGame: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<TestSettings>({
    difficulty: 'normal',
    soundEnabled: false,
  });
  const [testState, setTestState] = useState<TestState>('idle');
  const [currentRound, setCurrentRound] = useState(1);

  const handleResult = useCallback((result: ReactionResult) => {
    const existingResults = loadResults();
    saveResults([...existingResults, result]);
    setTestState('results');
    setCurrentRound(prev => prev + 1);
  }, []);

  const handleStartTest = useCallback(() => {
    setTestState('ready');
  }, []);

  const handleChangeDifficulty = useCallback((difficulty: Difficulty) => {
    setSettings(prev => ({ ...prev, difficulty }));
  }, []);

  const handleToggleSound = useCallback(() => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const handleEndGame = useCallback(() => {
    navigate('/results');
  }, [navigate]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Round {currentRound}</div>
        <button
          onClick={handleEndGame}
          className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
        >
          <XCircle size={20} />
          <span>End Game</span>
        </button>
      </div>

      <TestControls
        onStart={handleStartTest}
        disabled={testState === 'ready' || testState === 'waiting'}
        settings={settings}
        onChangeDifficulty={handleChangeDifficulty}
        onToggleSound={handleToggleSound}
      />
      
      <ReactionTest 
        onResult={handleResult} 
        settings={settings}
        autoStart={testState === 'results'}
      />
      
      <Instructions />
    </div>
  );
};

export default ReactionGame;