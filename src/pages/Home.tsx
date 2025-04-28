import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Trophy, BarChart3 } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">
          Test Your Reaction Time
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Challenge yourself with our reaction time test. Measure your reflexes and track your progress over time.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Zap className="w-8 h-8 text-blue-400" />}
          title="Quick Tests"
          description="Simple and fast reaction time measurements"
        />
        <FeatureCard
          icon={<Trophy className="w-8 h-8 text-green-400" />}
          title="Track Progress"
          description="Monitor your improvement over time"
        />
        <FeatureCard
          icon={<BarChart3 className="w-8 h-8 text-purple-400" />}
          title="Detailed Stats"
          description="View your performance statistics"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate('/play')}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
        >
          Start Testing
        </button>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-800 rounded-xl p-6 text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

export default Home;