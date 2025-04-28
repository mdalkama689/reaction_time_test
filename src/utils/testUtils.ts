import { Difficulty, ReactionResult, Stats } from '../types';

export const getRandomDelay = (difficulty: Difficulty): number => {
  // Base delays for different difficulty levels in milliseconds
  const delays = {
    easy: { min: 2000, max: 4000 },
    normal: { min: 1000, max: 3000 },
    hard: { min: 500, max: 2000 }
  };

  const { min, max } = delays[difficulty];
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const calculateStats = (results: ReactionResult[]): Stats => {
  if (results.length === 0) {
    return { average: 0, best: 0, worst: 0, count: 0 };
  }

  const times = results.map(result => result.time);
  const sum = times.reduce((acc, time) => acc + time, 0);
  
  return {
    average: Math.round(sum / times.length),
    best: Math.min(...times),
    worst: Math.max(...times),
    count: times.length
  };
};

export const formatTime = (time: number): string => {
  return `${time} ms`;
};

export const saveResults = (results: ReactionResult[]): void => {
  localStorage.setItem('reactionResults', JSON.stringify(results));
};

export const loadResults = (): ReactionResult[] => {
  const saved = localStorage.getItem('reactionResults');
  return saved ? JSON.parse(saved) : [];
};

export const getDifficultyColor = (difficulty: Difficulty): string => {
  const colors = {
    easy: 'text-green-400',
    normal: 'text-blue-400',
    hard: 'text-red-400'
  };
  
  return colors[difficulty];
};

export const getDifficultyLabel = (difficulty: Difficulty): string => {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
};