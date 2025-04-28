import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TestState, Difficulty, ReactionResult, TestSettings } from '../types';
import { getRandomDelay } from '../utils/testUtils';
import { AlertCircle, TimerReset } from 'lucide-react';
import { playSound, initAudioContext } from '../services/SoundService';

interface ReactionTestProps {
  onResult: (result: ReactionResult) => void;
  settings: TestSettings;
  autoStart?: boolean;
}

const ReactionTest: React.FC<ReactionTestProps> = ({ onResult, settings, autoStart }) => {
  const [state, setState] = useState<TestState>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(3);
  const [isEarly, setIsEarly] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const earlyClickRef = useRef(false);

  const resetTest = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setState('idle');
    setStartTime(null);
    setReactionTime(null);
    setIsEarly(false);
    earlyClickRef.current = false;
  }, []);

  const startTest = useCallback(() => {
    resetTest();
    setState('ready');
    setCountdown(3);
    if (settings.soundEnabled) {
      initAudioContext();
      playSound('ready');
    }
  }, [resetTest, settings.soundEnabled]);

  useEffect(() => {
    if (autoStart && state === 'results') {
      const timer = setTimeout(() => {
        startTest();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [autoStart, state, startTest]);

  const handleClick = useCallback(() => {
    if (state === 'idle' || state === 'results') {
      startTest();
      return;
    }

    if (state === 'ready' || state === 'waiting') {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setIsEarly(true);
      earlyClickRef.current = true;
      setState('results');
      if (settings.soundEnabled) {
        playSound('error');
      }
      return;
    }

    if (state === 'click') {
      const endTime = Date.now();
      if (startTime) {
        const time = endTime - startTime;
        setReactionTime(time);
        setState('results');
        
        if (settings.soundEnabled) {
          playSound('result');
        }
        
        onResult({
          timestamp: endTime,
          time,
          difficulty: settings.difficulty
        });
      }
    }
  }, [state, startTime, onResult, settings.difficulty, settings.soundEnabled, startTest]);

  useEffect(() => {
    if (state !== 'ready') return;

    if (countdown > 0) {
      const timer = window.setTimeout(() => {
        setCountdown(countdown - 1);
        if (settings.soundEnabled) {
          playSound('ready');
        }
      }, 1000);
      return () => window.clearTimeout(timer);
    } else {
      setState('waiting');
      
      const delay = getRandomDelay(settings.difficulty);
      timerRef.current = window.setTimeout(() => {
        if (!earlyClickRef.current) {
          setStartTime(Date.now());
          setState('click');
          if (settings.soundEnabled) {
            playSound('click');
          }
        }
      }, delay);
    }
  }, [state, countdown, settings.difficulty, settings.soundEnabled]);

  const getBackgroundColor = () => {
    switch (state) {
      case 'idle':
        return 'bg-gray-800';
      case 'ready':
        return 'bg-blue-900';
      case 'waiting':
        return 'bg-blue-800';
      case 'click':
        return 'bg-green-600';
      case 'results':
        return isEarly ? 'bg-red-900' : 'bg-gray-800';
      default:
        return 'bg-gray-800';
    }
  };

  const getText = () => {
    switch (state) {
      case 'idle':
        return 'Click to start';
      case 'ready':
        return countdown > 0 ? countdown : 'Get ready...';
      case 'waiting':
        return 'Wait for green...';
      case 'click':
        return 'CLICK NOW!';
      case 'results':
        if (isEarly) {
          return (
            <div className="flex flex-col items-center">
              <AlertCircle className="mb-2 text-red-400" size={32} />
              <span>Too early! Next round starting...</span>
            </div>
          );
        }
        return (
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white mb-2">
              {reactionTime} ms
            </span>
            <span className="text-sm text-gray-300">Next round starting...</span>
          </div>
        );
      default:
        return '';
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full max-w-md mx-auto rounded-xl p-8 flex flex-col items-center justify-center transition-colors duration-300 h-60 md:h-72 cursor-pointer border border-gray-700 shadow-lg ${getBackgroundColor()}`}
    >
      <div className="text-white text-center text-xl md:text-2xl font-medium">
        {getText()}
      </div>
    </div>
  );
};

export default ReactionTest;