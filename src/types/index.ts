export type TestState = 'idle' | 'ready' | 'waiting' | 'click' | 'results';

export type Difficulty = 'easy' | 'normal' | 'hard';

export type ReactionResult = {
  timestamp: number;
  time: number;
  difficulty: Difficulty;
};

export type TestSettings = {
  difficulty: Difficulty;
  soundEnabled: boolean;
};

export type Stats = {
  average: number;
  best: number;
  worst: number;
  count: number;
};