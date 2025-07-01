import React from 'react';

interface PerformanceStatusCardProps {
  title: string;
  description: string;
  strengths: string;
  concerns: string;
}

const PerformanceStatusCard: React.FC<PerformanceStatusCardProps> = ({ title, description, strengths, concerns }) => (
  <div className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 sm:border-l-8 border-yellow-400">
    <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{title}</h3>
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

export default PerformanceStatusCard; 