import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ReactionResult } from '../types';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HistoryChartProps {
  results: ReactionResult[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ results }) => {
  const navigate = useNavigate();

  if (results.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl p-6 text-center">
        <div className="text-gray-400 mb-4">Complete a test to see your performance chart</div>
        <button
          onClick={() => navigate('/play')}
          className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 mx-auto"
        >
          <Play size={18} />
          <span>Start Test</span>
        </button>
      </div>
    );
  }

  // Show all results
  const labels = results.map((_, index) => `Test ${index + 1}`);
  
  const difficultyColorMap = {
    easy: 'rgba(52, 211, 153, 0.8)', // green
    normal: 'rgba(59, 130, 246, 0.8)', // blue
    hard: 'rgba(239, 68, 68, 0.8)', // red
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Reaction Time (ms)',
        data: results.map(result => result.time),
        borderColor: results.map(result => difficultyColorMap[result.difficulty]),
        backgroundColor: results.map(result => difficultyColorMap[result.difficulty].replace('0.8', '0.2')),
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        bodyFont: {
          size: 14,
        },
        padding: 12,
        callbacks: {
          label: function(context) {
            const resultIndex = context.dataIndex;
            const result = results[resultIndex];
            return [
              `Time: ${result.time} ms`,
              `Difficulty: ${result.difficulty.charAt(0).toUpperCase() + result.difficulty.slice(1)}`
            ];
          }
        }
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Performance History</h3>
        <button
          onClick={() => navigate('/play')}
          className="flex items-center space-x-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all transform hover:scale-105"
        >
          <Play size={16} />
          <span>Play Again</span>
        </button>
      </div>
      <div className="h-60">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default HistoryChart;