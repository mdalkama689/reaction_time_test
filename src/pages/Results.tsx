import React from 'react';
import StatisticsPanel from '../components/StatisticsPanel';
import HistoryChart from '../components/HistoryChart';
import { loadResults } from '../utils/testUtils';

const Results: React.FC = () => {
  const results = loadResults();
  const latestDifficulty = results[results.length - 1]?.difficulty || 'normal';
  
  const filteredResults = results.filter(
    result => result.difficulty === latestDifficulty
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatisticsPanel 
          stats={{
            average: Math.round(filteredResults.reduce((acc, r) => acc + r.time, 0) / filteredResults.length),
            best: Math.min(...filteredResults.map(r => r.time)),
            worst: Math.max(...filteredResults.map(r => r.time)),
            count: filteredResults.length
          }}
          difficulty={latestDifficulty}
        />
        
        <HistoryChart results={filteredResults} />
      </div>
    </div>
  );
};

export default Results;