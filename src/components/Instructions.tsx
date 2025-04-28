import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

const Instructions: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-white hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center">
          <Info size={18} className="text-blue-400 mr-2" />
          <span className="font-medium">How it works</span>
        </div>
        {isExpanded ? (
          <ChevronUp size={18} className="text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-gray-800 text-gray-300 text-sm border-t border-gray-700">
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Start the test</strong> by clicking the "Start Test" button</li>
            <li><strong>Wait</strong> for the countdown timer</li>
            <li>The screen will turn blue - <strong>remain ready but don't click yet</strong></li>
            <li>When the screen turns <strong>green</strong>, click as quickly as possible</li>
            <li>Your reaction time will be displayed in milliseconds</li>
            <li>Try different difficulty levels for varying challenges</li>
            <li>Track your progress over time with the performance chart</li>
          </ol>
          
          <div className="mt-4 p-3 bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-300">
              <strong>Tip:</strong> The average human reaction time is between 200-250ms. How fast are you?
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;