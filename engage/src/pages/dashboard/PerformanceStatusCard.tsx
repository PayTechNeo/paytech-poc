import React from 'react';

interface PerformanceStatusCardProps {
  title: string;
  description: string;
  strengths: string;
  concerns: string;
  healthScore?: number;
}

const PerformanceStatusCard: React.FC<PerformanceStatusCardProps> = ({ title, description, strengths, concerns, healthScore }) => {
  // Determine circle color based on healthScore
  const getCircleColor = (score?: number) => {
    if (!score) return 'bg-gray-400';
    if (score < 40) return 'bg-red-500';
    if (score >= 40 && score < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex justify-between items-center gap-2 mb-2 sm:mb-3">
        <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
        <div className={`w-8 h-8 rounded-full ${getCircleColor(healthScore)}`}></div>
      </div>
    <p className="mb-2 sm:mb-3 text-gray-700 text-sm sm:text-base leading-relaxed">{description}</p>
    <div className="mb-2 sm:mb-3">
      <span className="font-bold text-sm sm:text-base">Strengths:</span> 
      <span className="text-sm sm:text-base ml-1">{strengths}</span>
    </div>
          <div>
        <span className="font-bold text-sm sm:text-base">Concerns:</span> 
        <span className="text-sm sm:text-base ml-1">{concerns}</span>
      </div>
    </div>
  );
};

export default PerformanceStatusCard; 