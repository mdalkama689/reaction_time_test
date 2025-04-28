import React from 'react';
import { Stats, Difficulty } from '../types';
import { getDifficultyColor, getDifficultyLabel } from '../utils/testUtils';
import { Timer, Award, Clock, AlertTriangle } from 'lucide-react';

interface StatisticsPanelProps {
  stats: Stats;
  difficulty: Difficulty;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ stats, difficulty }) => {
  const difficultyColor = getDifficultyColor(difficulty);
  const difficultyLabel = getDifficultyLabel(difficulty);
  
  if (stats.count === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl p-6 text-center text-gray-400">
        <Clock className="mx-auto mb-2" size={24} />
        <p>Complete a test to see your statistics</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Statistics</h3>
          <span className={`px-2 py-1 rounded text-sm font-medium ${difficultyColor} bg-gray-700`}>
            {difficultyLabel}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <StatCard 
            title="Average" 
            value={stats.average} 
            icon={<Timer size={20} className="text-blue-400" />} 
          />
          <StatCard 
            title="Best" 
            value={stats.best} 
            icon={<Award size={20} className="text-green-400" />} 
          />
          <StatCard 
            title="Worst" 
            value={stats.worst} 
            icon={<AlertTriangle size={20} className="text-red-400" />} 
          />
        </div>
        
        <div className="mt-4 text-right text-sm text-gray-400">
          Based on {stats.count} {stats.count === 1 ? 'test' : 'tests'}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-700 rounded-lg p-3 flex flex-col items-center">
      <div className="flex items-center justify-center mb-1">
        {icon}
        <span className="ml-1 text-xs text-gray-300">{title}</span>
      </div>
      <div className="text-xl font-bold text-white">{value} ms</div>
    </div>
  );
};

export default StatisticsPanel;